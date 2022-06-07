/**
 * Candy machine API taken from exiled-apes
 * @link https://github.com/exiled-apes/candy-machine-mint/blob/main/src/candy-machine.ts
 */

import * as anchor from '@project-serum/anchor';
import {MintLayout, Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import axios from 'axios';
import base58 from 'bs58';
import {Buffer} from 'buffer';

export const CANDY_MACHINE_PROGRAM = new anchor.web3.PublicKey(
  'CMY8R8yghKfFnHKCWjzrArUpYH4PbJ56aWBr4kCP4DMk',
);

export const OLD_CANDY_MACHINE_PROGRAM = new anchor.web3.PublicKey(
  'cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ',
);

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new anchor.web3.PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);

const TOKEN_METADATAPROGRAM_ID = new PublicKey(
  'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
);

export interface CandyMachine {
  id: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  program: anchor.Program;
}

interface CandyMachineState {
  candyMachine: CandyMachine;
  itemsAvailable: number;
  itemsRedeemed: number;
  itemsRemaining: number;
  price: number;
  goLiveDate: Date;
  whitelisted: boolean;
  presale: Date | null;
  launchDate: Date;
  walletLimit: number | null;
}

export const awaitTransactionSignatureConfirmation = async (
  txid: anchor.web3.TransactionSignature,
  timeout: number,
  connection: anchor.web3.Connection,
  commitment: anchor.web3.Commitment = 'recent',
  queryStatus = false,
): Promise<anchor.web3.SignatureStatus | null | void> => {
  let done = false;
  let status: anchor.web3.SignatureStatus | null | void = {
    slot: 0,
    confirmations: 0,
    err: null,
  };
  let subId = 0;
  status = await new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (done) {
        return;
      }
      done = true;
      console.log('Rejecting for timeout...');
      reject({timeout: true});
    }, timeout);
    try {
      subId = connection.onSignature(
        txid,
        (result: any, context: any) => {
          done = true;
          status = {
            err: result.err,
            slot: context.slot,
            confirmations: 0,
          };
          if (result.err) {
            console.log('Rejected via websocket', result.err);
            reject(status);
          } else {
            console.log('Resolved via websocket', result);
            resolve(status);
          }
        },
        commitment,
      );
    } catch (e) {
      done = true;
      console.error('WS error in setup', txid, e);
    }
    while (!done && queryStatus) {
      // eslint-disable-next-line no-loop-func
      (async () => {
        try {
          const signatureStatuses = await connection.getSignatureStatuses([
            txid,
          ]);
          status = signatureStatuses && signatureStatuses.value[0];
          if (!done) {
            if (!status) {
              console.log('REST null result for', txid, status);
            } else if (status.err) {
              console.log('REST error for', txid, status);
              done = true;
              reject(status.err);
            } else if (!status.confirmations) {
              console.log('REST no confirmations for', txid, status);
            } else {
              console.log('REST confirmation for', txid, status);
              done = true;
              resolve(status);
            }
          }
        } catch (e) {
          if (!done) {
            console.log('REST connection error: txid', txid, e);
          }
        }
      })();
      await sleep(2000);
    }
  });

  if ((connection as any)._signatureSubscriptions[subId]) {
    connection.removeSignatureListener(subId);
  }
  done = true;
  console.log('Returning status', status);
  return status;
};

const createAssociatedTokenAccountInstruction = (
  associatedTokenAddress: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  walletAddress: anchor.web3.PublicKey,
  splTokenMintAddress: anchor.web3.PublicKey,
) => {
  const keys = [
    {pubkey: payer, isSigner: true, isWritable: true},
    {pubkey: associatedTokenAddress, isSigner: false, isWritable: true},
    {pubkey: walletAddress, isSigner: false, isWritable: false},
    {pubkey: splTokenMintAddress, isSigner: false, isWritable: false},
    {
      pubkey: anchor.web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
    {
      pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new anchor.web3.TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
  });
};

export const getState = async (
  candyMachineId: anchor.web3.PublicKey,
  connection: anchor.web3.Connection,
  usesNewContract = false,
): Promise<CandyMachineState> => {
  const publicKey = await LocalStorageService.getItem(
    WalletService.generateObfuscatedKeychain('pubKey-wallet-1'),
  );
  const wallet = publicKey
    ? new AnchorCompliantWallet({
        signAllTransactions: () => {},
        signTransaction: () => {},
        adapter: {
          publicKey: new PublicKey(publicKey),
        },
      })
    : null;
  const provider = new anchor.Provider(connection, wallet as any, {
    preflightCommitment: 'recent',
  });
  const programAddress = usesNewContract
    ? CANDY_MACHINE_PROGRAM
    : OLD_CANDY_MACHINE_PROGRAM;

  const idl = await anchor.Program.fetchIdl(programAddress, provider);

  const program = new anchor.Program(idl!, programAddress, provider);

  const candyMachine = {
    id: candyMachineId,
    connection,
    program,
  };

  const state: any = await program.account.candyMachine.fetch(candyMachineId);
  const walletLimit = state.data.walletLimit;
  const itemsAvailable = state.data.itemsAvailable.toNumber();
  const itemsRedeemed = state.itemsRedeemed.toNumber();
  const itemsRemaining = itemsAvailable - itemsRedeemed;
  const price = state.data.price.toNumber() / LAMPORTS_PER_SOL;

  const {whitelist, presale} = await axios
    .get<{
      whitelist?: boolean;
      presale?: string;
    }>(`${getNotaryUrl()}/contract/${candyMachineId.toBase58()}`)
    .then(res => res.data);

  let goLiveDate = state.data.goLiveDate
    ? new Date(state.data.goLiveDate.toNumber() * 1000)
    : new Date();

  const launchDate = goLiveDate;

  let whitelisted = true;

  if (whitelist) {
    if (wallet) {
      whitelisted = await axios
        .get<{status: boolean}>(
          `${getNotaryUrl()}/whitelisted/${candyMachineId.toBase58()}/${wallet.publicKey.toBase58()}`,
        )
        .then(res => res.data.status);

      if (presale && !whitelisted) {
        goLiveDate = new Date(presale);
      }
    }
  }

  return {
    candyMachine,
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining,
    price,
    goLiveDate,
    whitelisted,
    presale: presale ? new Date(presale) : null,
    launchDate,
    walletLimit,
  };
};

const getMasterEdition = async (
  mint: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('edition'),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

const getMetadata = async (
  mint: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

const getTokenWallet = async (
  wallet: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey,
) => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0];
};

const getWalletLimitInfo = async (
  cmAddress: anchor.web3.PublicKey,
  wallet: anchor.web3.PublicKey,
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode('wallet_limit'),
      cmAddress.toBuffer(),
      wallet.toBuffer(),
    ],
    CANDY_MACHINE_PROGRAM,
  );
};

export const mintOneToken = async (
  candyMachine: CandyMachine,
  config: anchor.web3.PublicKey, // feels like this should be part of candyMachine?
  payerWallet: anchor.Wallet,
  treasury: anchor.web3.PublicKey,
  captcha: string,
): Promise<string> => {
  const payer = payerWallet.publicKey;

  const mint = anchor.web3.Keypair.generate();

  const token = await getTokenWallet(payer, mint.publicKey);
  const {connection, program} = candyMachine;

  const metadata = await getMetadata(mint.publicKey);
  const masterEdition = await getMasterEdition(mint.publicKey);
  const data = Buffer.from(captcha);

  const rent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );

  const [walletLimitInfo, walletLimitInfoBump] = await getWalletLimitInfo(
    candyMachine.id,
    payer,
  );

  const cmAccount = (await program.account.candyMachine.fetch(
    candyMachine.id,
  )) as any;

  const tx = program.transaction.mintNft(walletLimitInfoBump, {
    accounts: {
      config,
      candyMachine: candyMachine.id,
      payer: payer,
      wallet: treasury,
      mint: mint.publicKey,
      metadata,
      masterEdition,
      walletLimitInfo,
      mintAuthority: payer,
      updateAuthority: payer,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    },
    signers: [mint],

    remainingAccounts: [
      {
        pubkey: anchor.web3.PublicKey.default,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: anchor.web3.PublicKey.default,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: cmAccount.notary || anchor.web3.SystemProgram.programId,
        isWritable: false,
        isSigner: true,
      },
    ],

    instructions: [
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: mint.publicKey,
        space: MintLayout.span,
        lamports: rent,
        programId: TOKEN_PROGRAM_ID,
      }),
      new TransactionInstruction({
        programId: TOKEN_METADATAPROGRAM_ID,
        keys: [],
        data,
      }),
      Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mint.publicKey,
        0,
        payer,
        payer,
      ),
      createAssociatedTokenAccountInstruction(
        token,
        payer,
        payer,
        mint.publicKey,
      ),
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mint.publicKey,
        token,
        payer,
        [],
        1,
      ),
    ],
  });

  const {blockhash} = await connection.getRecentBlockhash('finalized');

  tx.recentBlockhash = blockhash;
  tx.feePayer = payerWallet.publicKey;

  try {
    const response = await axios.post(
      `${getNotaryUrl()}/sign`,
      {
        response: captcha,
        message: base58.encode(tx.serializeMessage()),
      },
      {
        headers: {
          authorization: '9PvA72aYHKzBc8b9QkToH33xNAPDhMKg3KVWo7T4vGdU',
        },
      },
    );

    const {signature} = response.data;
    await payerWallet.signTransaction(tx);

    tx.partialSign(mint);
    tx.addSignature(cmAccount.notary, base58.decode(signature));

    const rawTx = tx.serialize({verifySignatures: true});
    const txId = await connection.sendRawTransaction(rawTx);
    return txId;
  } catch (e) {
    console.log('error: ', e);
    throw e;
  }
};

export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
