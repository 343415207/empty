import { Keypair, PublicKey, SystemProgram,TransactionInstruction } from '@solana/web3.js';
import {
  CandyMachine,
  getAtaForMint,
  getCandyMachineAddress,
  getCandyMachineCreator,
  getCollectionAuthorityRecordPDA,
  getCollectionPDA,
  getMasterEdition,
  getMetadata,
  getTokenWallet,
  loadCandyProgram,
  loadCandyProgramV2,
  loadWalletKey,
} from '../helpers/accounts';
import {
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '../helpers/constants';
import * as anchor from '@project-serum/anchor';
import { MintLayout, Token } from '@solana/spl-token';
import { createAssociatedTokenAccountInstruction } from '../helpers/instructions';
import { sendTransactionWithRetryWithKeypair } from '../helpers/transactions';
import log from 'loglevel';

export async function mint(
  candyMachineAddress: PublicKey,
  keypair: Keypair,
  rpcUrl: string,
): Promise<string> {
  const mint = Keypair.generate();
  const userKeyPair = keypair;
  const payer = userKeyPair.publicKey;
  const anchorProgram = await loadCandyProgram(userKeyPair, rpcUrl);
  const userTokenAccountAddress = await getTokenWallet(
    userKeyPair.publicKey,
    mint.publicKey,
  );

  const candyMachine  = await anchorProgram.account.candyMachine.fetch(
    candyMachineAddress,
  );

const rent = await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(
  MintLayout.span,
)
  const remainingAccounts = [
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
      pubkey: candyMachine.wallet || anchor.web3.SystemProgram.programId,
      isWritable: false,
      isSigner: true,
    },
  ];
  const signers = [mint];
  const instructions =   [
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint.publicKey,
      space: MintLayout.span,
      lamports: rent,
      programId: TOKEN_PROGRAM_ID,
    }),
    new TransactionInstruction({
      programId: TOKEN_METADATA_PROGRAM_ID,
      keys: [],
      //data,
    }),
    Token.createInitMintInstruction(
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      0,
      payer,
      payer,
    ),
    createAssociatedTokenAccountInstruction(
      userTokenAccountAddress,
      payer,
      payer,
      mint.publicKey,
    ),
    Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      userTokenAccountAddress,
      payer,
      [],
      1,
    ),
  ]

  
  const metadataAddress = await getMetadata(mint.publicKey);
  const masterEdition = await getMasterEdition(mint.publicKey);
  log.info(`mint nft config address is : ${candyMachine.config}`)
  instructions.push(
    await anchorProgram.instruction.mintNft({
      accounts: {
        config: candyMachine.config,
        candyMachine: candyMachineAddress,
        payer: userKeyPair.publicKey,
        //@ts-ignore
        wallet: candyMachine.wallet,
        mint: mint.publicKey,
        metadata: metadataAddress,
        masterEdition,
        mintAuthority: userKeyPair.publicKey,
        updateAuthority: userKeyPair.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      },
      remainingAccounts,
    }),
  );

  return (
    await sendTransactionWithRetryWithKeypair(
      anchorProgram.provider.connection,
      userKeyPair,
      instructions,
      signers,
    )
  ).txid;
}

export async function mintV2(
  keypair: Keypair,
  candyMachineAddress: PublicKey,
  rpcUrl: string,
): Promise<string> {
  const mint = Keypair.generate();

  const userKeyPair = keypair;
  const anchorProgram = await loadCandyProgramV2(userKeyPair, rpcUrl);
  console.log("anchorProgram idl: ", JSON.stringify(anchorProgram.idl))
  // const anchorProgram = await loadCandyProgram(userKeyPair, rpcUrl)
  const userTokenAccountAddress = await getTokenWallet(
    userKeyPair.publicKey,
    mint.publicKey,
  );
  console.log("userTokenAccountAddress : ", userTokenAccountAddress)
  const candyMachine: CandyMachine =
    await anchorProgram.account.candyMachine.fetch(candyMachineAddress);
  console.log("CandyMachine : ", JSON.stringify(candyMachine))
  const remainingAccounts = [];
  const signers = [mint, userKeyPair];
  const cleanupInstructions = [];
  let createAccount = anchor.web3.SystemProgram.createAccount({
    fromPubkey: userKeyPair.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MintLayout.span,
    lamports:
      await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(
        MintLayout.span,
      ),
    programId: TOKEN_PROGRAM_ID,
  });
  log.info(`createAccount create account ${JSON.stringify(createAccount)}`)
let createInitMintInstruction = Token.createInitMintInstruction(
  TOKEN_PROGRAM_ID,
  mint.publicKey,
  0,
  userKeyPair.publicKey,
  userKeyPair.publicKey,
)
log.info(`createInitMintInstruction create account ${JSON.stringify(createInitMintInstruction)}`)
let createAssociatedTokenAccountIns= createAssociatedTokenAccountInstruction(
  userTokenAccountAddress,
  userKeyPair.publicKey,
  userKeyPair.publicKey,
  mint.publicKey,
);
log.info(`createAssociatedTokenAccountIns create account ${JSON.stringify(createAssociatedTokenAccountIns)}`)
let createMintToInstruction = Token.createMintToInstruction(
  TOKEN_PROGRAM_ID,
  mint.publicKey,
  userTokenAccountAddress,
  userKeyPair.publicKey,
  [],
  1,
);
log.info(`createMintToInstruction create account ${JSON.stringify(createMintToInstruction)}`)
  const instructions = [
    createAccount,
    createInitMintInstruction,
    createAssociatedTokenAccountIns,
    createMintToInstruction
  ];

  // if (candyMachine.data.whitelistMintSettings) {
  //   const mint = new anchor.web3.PublicKey(
  //     candyMachine.data.whitelistMintSettings.mint,
  //   );

  //   const whitelistToken = (
  //     await getAtaForMint(mint, userKeyPair.publicKey)
  //   )[0];
  //   remainingAccounts.push({
  //     pubkey: whitelistToken,
  //     isWritable: true,
  //     isSigner: false,
  //   });

  //   if (candyMachine.data.whitelistMintSettings.mode.burnEveryTime) {
  //     const whitelistBurnAuthority = anchor.web3.Keypair.generate();

  //     remainingAccounts.push({
  //       pubkey: mint,
  //       isWritable: true,
  //       isSigner: false,
  //     });
  //     remainingAccounts.push({
  //       pubkey: whitelistBurnAuthority.publicKey,
  //       isWritable: false,
  //       isSigner: true,
  //     });
  //     signers.push(whitelistBurnAuthority);
  //     const exists = await anchorProgram.provider.connection.getAccountInfo(
  //       whitelistToken,
  //     );
  //     if (exists) {
  //       instructions.push(
  //         Token.createApproveInstruction(
  //           TOKEN_PROGRAM_ID,
  //           whitelistToken,
  //           whitelistBurnAuthority.publicKey,
  //           userKeyPair.publicKey,
  //           [],
  //           1,
  //         ),
  //       );
  //       cleanupInstructions.push(
  //         Token.createRevokeInstruction(
  //           TOKEN_PROGRAM_ID,
  //           whitelistToken,
  //           userKeyPair.publicKey,
  //           [],
  //         ),
  //       );
  //     }
  //   }
  // }

  let tokenAccount;
  if (candyMachine.tokenMint) {
    const transferAuthority = anchor.web3.Keypair.generate();

    tokenAccount = await getTokenWallet(
      userKeyPair.publicKey,
      candyMachine.tokenMint,
    );

    remainingAccounts.push({
      pubkey: tokenAccount,
      isWritable: true,
      isSigner: false,
    });
    remainingAccounts.push({
      pubkey: transferAuthority.publicKey,
      isWritable: false,
      isSigner: true,
    });

    instructions.push(
      Token.createApproveInstruction(
        TOKEN_PROGRAM_ID,
        tokenAccount,
        transferAuthority.publicKey,
        userKeyPair.publicKey,
        [],
        candyMachine.data.price.toNumber(),
      ),
    );
    signers.push(transferAuthority);
    cleanupInstructions.push(
      Token.createRevokeInstruction(
        TOKEN_PROGRAM_ID,
        tokenAccount,
        userKeyPair.publicKey,
        [],
      ),
    );
  }
  const metadataAddress = await getMetadata(mint.publicKey);
  const masterEdition = await getMasterEdition(mint.publicKey);

  log.debug(
    'Remaining accounts: ',
    remainingAccounts.map(i => i.pubkey.toBase58()),
  );
  const [candyMachineCreator, creatorBump] = await getCandyMachineCreator(
    candyMachineAddress,
  );
  log.info(`begin create mint instruction `)
  let mintInstruction =  await anchorProgram.instruction.mintNft(creatorBump, {
    accounts: {
      candyMachine: candyMachineAddress,
      candyMachineCreator,
      payer: userKeyPair.publicKey,
      //@ts-ignore
      wallet: candyMachine.wallet,
      mint: mint.publicKey,
      metadata: metadataAddress,
      masterEdition,
      mintAuthority: userKeyPair.publicKey,
      updateAuthority: userKeyPair.publicKey,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      recentBlockhashes: anchor.web3.SYSVAR_SLOT_HASHES_PUBKEY,
      instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    },
    remainingAccounts:
      remainingAccounts.length > 0 ? remainingAccounts : undefined,
  });
  log.info(`instructions is : ${JSON.stringify(mintInstruction)}`)
  instructions.push(mintInstruction);

  
  const collectionPDA = (await getCollectionPDA(candyMachineAddress))[0];
  const collectionPDAAccount =
    await anchorProgram.provider.connection.getAccountInfo(collectionPDA);

  if (collectionPDAAccount && candyMachine.data.retainAuthority) {
    try {
      const collectionPdaData =
        (await anchorProgram.account.collectionPda.fetch(collectionPDA)) as {
          mint: PublicKey;
        };
      const collectionMint = collectionPdaData.mint;
      const collectionAuthorityRecord = (
        await getCollectionAuthorityRecordPDA(collectionMint, collectionPDA)
      )[0];

      if (collectionMint) {
        const collectionMetadata = await getMetadata(collectionMint);
        const collectionMasterEdition = await getMasterEdition(collectionMint);
        log.debug('Collection PDA: ', collectionPDA.toBase58());
        log.debug('Authority: ', candyMachine.authority.toBase58());

        instructions.push(
          await anchorProgram.instruction.setCollectionDuringMint({
            accounts: {
              candyMachine: candyMachineAddress,
              metadata: metadataAddress,
              payer: userKeyPair.publicKey,
              collectionPda: collectionPDA,
              tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
              instructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              collectionMint: collectionMint,
              collectionMetadata,
              collectionMasterEdition,
              authority: candyMachine.authority,
              collectionAuthorityRecord,
            },
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  const data = candyMachine.data;
  const txnEstimate =
    892 +
    (collectionPDAAccount && data.retainAuthority ? 182 : 0) +
    (candyMachine.tokenMint ? 177 : 0) +
    (data.whitelistMintSettings ? 33 : 0) +
    (data.whitelistMintSettings?.mode?.burnEveryTime ? 145 : 0) +
    (data.gatekeeper ? 33 : 0) +
    (data.gatekeeper?.expireOnUse ? 66 : 0);

  log.info('Transaction size estimate: ', txnEstimate);
  const INIT_INSTRUCTIONS_LENGTH = 4;
  const INIT_SIGNERS_LENGTH = 1;
  let initInstructions: anchor.web3.TransactionInstruction[] = [];
  let initSigners: Keypair[] = [];

  if (txnEstimate > 1230) {
    initInstructions = instructions.splice(0, INIT_INSTRUCTIONS_LENGTH);
    initSigners = signers.splice(0, INIT_SIGNERS_LENGTH);
  }

  if (initInstructions.length > 0) {
    await sendTransactionWithRetryWithKeypair(
      anchorProgram.provider.connection,
      userKeyPair,
      initInstructions,
      initSigners,
    );
  }

  const mainInstructions = (
    await sendTransactionWithRetryWithKeypair(
      anchorProgram.provider.connection,
      userKeyPair,
      instructions,
      signers,
    )
  ).txid;

  if (cleanupInstructions.length > 0) {
    await sendTransactionWithRetryWithKeypair(
      anchorProgram.provider.connection,
      userKeyPair,
      cleanupInstructions,
      [],
    );
  }

  return mainInstructions;
}
