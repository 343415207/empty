"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintV2 = exports.mint = void 0;
const web3_js_1 = require("@solana/web3.js");
const accounts_1 = require("../helpers/accounts");
const constants_1 = require("../helpers/constants");
const anchor = __importStar(require("@project-serum/anchor"));
const spl_token_1 = require("@solana/spl-token");
const instructions_1 = require("../helpers/instructions");
const transactions_1 = require("../helpers/transactions");
const loglevel_1 = __importDefault(require("loglevel"));
async function mint(candyMachineAddress, keypair, rpcUrl) {
    const mint = web3_js_1.Keypair.generate();
    const userKeyPair = keypair;
    const payer = userKeyPair.publicKey;
    const anchorProgram = await (0, accounts_1.loadCandyProgram)(userKeyPair, rpcUrl);
    const userTokenAccountAddress = await (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, mint.publicKey);
    const candyMachine = await anchorProgram.account.candyMachine.fetch(candyMachineAddress);
    const rent = await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span);
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
    const instructions = [
        anchor.web3.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mint.publicKey,
            space: spl_token_1.MintLayout.span,
            lamports: rent,
            programId: constants_1.TOKEN_PROGRAM_ID,
        }),
        new web3_js_1.TransactionInstruction({
            programId: constants_1.TOKEN_METADATA_PROGRAM_ID,
            keys: [],
            //data,
        }),
        spl_token_1.Token.createInitMintInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, payer, payer),
        (0, instructions_1.createAssociatedTokenAccountInstruction)(userTokenAccountAddress, payer, payer, mint.publicKey),
        spl_token_1.Token.createMintToInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, payer, [], 1),
    ];
    const metadataAddress = await (0, accounts_1.getMetadata)(mint.publicKey);
    const masterEdition = await (0, accounts_1.getMasterEdition)(mint.publicKey);
    loglevel_1.default.info(`mint nft config address is : ${candyMachine.config}`);
    instructions.push(await anchorProgram.instruction.mintNft({
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
            tokenMetadataProgram: constants_1.TOKEN_METADATA_PROGRAM_ID,
            tokenProgram: constants_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        },
        remainingAccounts,
    }));
    return (await (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, instructions, signers)).txid;
}
exports.mint = mint;
async function mintV2(keypair, candyMachineAddress, rpcUrl) {
    var _a, _b, _c;
    const mint = web3_js_1.Keypair.generate();
    const userKeyPair = keypair;
    const anchorProgram = await (0, accounts_1.loadCandyProgramV2)(userKeyPair, rpcUrl);
    console.log("anchorProgram idl: ", JSON.stringify(anchorProgram.idl));
    // const anchorProgram = await loadCandyProgram(userKeyPair, rpcUrl)
    const userTokenAccountAddress = await (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, mint.publicKey);
    console.log("userTokenAccountAddress : ", userTokenAccountAddress);
    const candyMachine = await anchorProgram.account.candyMachine.fetch(candyMachineAddress);
    console.log("CandyMachine : ", JSON.stringify(candyMachine));
    const remainingAccounts = [];
    const signers = [mint, userKeyPair];
    const cleanupInstructions = [];
    let createAccount = anchor.web3.SystemProgram.createAccount({
        fromPubkey: userKeyPair.publicKey,
        newAccountPubkey: mint.publicKey,
        space: spl_token_1.MintLayout.span,
        lamports: await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span),
        programId: constants_1.TOKEN_PROGRAM_ID,
    });
    loglevel_1.default.info(`createAccount create account ${JSON.stringify(createAccount)}`);
    let createInitMintInstruction = spl_token_1.Token.createInitMintInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, userKeyPair.publicKey, userKeyPair.publicKey);
    loglevel_1.default.info(`createInitMintInstruction create account ${JSON.stringify(createInitMintInstruction)}`);
    let createAssociatedTokenAccountIns = (0, instructions_1.createAssociatedTokenAccountInstruction)(userTokenAccountAddress, userKeyPair.publicKey, userKeyPair.publicKey, mint.publicKey);
    loglevel_1.default.info(`createAssociatedTokenAccountIns create account ${JSON.stringify(createAssociatedTokenAccountIns)}`);
    let createMintToInstruction = spl_token_1.Token.createMintToInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, userKeyPair.publicKey, [], 1);
    loglevel_1.default.info(`createMintToInstruction create account ${JSON.stringify(createMintToInstruction)}`);
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
        tokenAccount = await (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, candyMachine.tokenMint);
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
        instructions.push(spl_token_1.Token.createApproveInstruction(constants_1.TOKEN_PROGRAM_ID, tokenAccount, transferAuthority.publicKey, userKeyPair.publicKey, [], candyMachine.data.price.toNumber()));
        signers.push(transferAuthority);
        cleanupInstructions.push(spl_token_1.Token.createRevokeInstruction(constants_1.TOKEN_PROGRAM_ID, tokenAccount, userKeyPair.publicKey, []));
    }
    const metadataAddress = await (0, accounts_1.getMetadata)(mint.publicKey);
    const masterEdition = await (0, accounts_1.getMasterEdition)(mint.publicKey);
    loglevel_1.default.debug('Remaining accounts: ', remainingAccounts.map(i => i.pubkey.toBase58()));
    const [candyMachineCreator, creatorBump] = await (0, accounts_1.getCandyMachineCreator)(candyMachineAddress);
    loglevel_1.default.info(`begin create mint instruction `);
    let mintInstruction = await anchorProgram.instruction.mintNft(creatorBump, {
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
            tokenMetadataProgram: constants_1.TOKEN_METADATA_PROGRAM_ID,
            tokenProgram: constants_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
            recentBlockhashes: anchor.web3.SYSVAR_SLOT_HASHES_PUBKEY,
            instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        },
        remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
    });
    loglevel_1.default.info(`instructions is : ${JSON.stringify(mintInstruction)}`);
    instructions.push(mintInstruction);
    const collectionPDA = (await (0, accounts_1.getCollectionPDA)(candyMachineAddress))[0];
    const collectionPDAAccount = await anchorProgram.provider.connection.getAccountInfo(collectionPDA);
    if (collectionPDAAccount && candyMachine.data.retainAuthority) {
        try {
            const collectionPdaData = (await anchorProgram.account.collectionPda.fetch(collectionPDA));
            const collectionMint = collectionPdaData.mint;
            const collectionAuthorityRecord = (await (0, accounts_1.getCollectionAuthorityRecordPDA)(collectionMint, collectionPDA))[0];
            if (collectionMint) {
                const collectionMetadata = await (0, accounts_1.getMetadata)(collectionMint);
                const collectionMasterEdition = await (0, accounts_1.getMasterEdition)(collectionMint);
                loglevel_1.default.debug('Collection PDA: ', collectionPDA.toBase58());
                loglevel_1.default.debug('Authority: ', candyMachine.authority.toBase58());
                instructions.push(await anchorProgram.instruction.setCollectionDuringMint({
                    accounts: {
                        candyMachine: candyMachineAddress,
                        metadata: metadataAddress,
                        payer: userKeyPair.publicKey,
                        collectionPda: collectionPDA,
                        tokenMetadataProgram: constants_1.TOKEN_METADATA_PROGRAM_ID,
                        instructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                        collectionMint: collectionMint,
                        collectionMetadata,
                        collectionMasterEdition,
                        authority: candyMachine.authority,
                        collectionAuthorityRecord,
                    },
                }));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const data = candyMachine.data;
    const txnEstimate = 892 +
        (collectionPDAAccount && data.retainAuthority ? 182 : 0) +
        (candyMachine.tokenMint ? 177 : 0) +
        (data.whitelistMintSettings ? 33 : 0) +
        (((_b = (_a = data.whitelistMintSettings) === null || _a === void 0 ? void 0 : _a.mode) === null || _b === void 0 ? void 0 : _b.burnEveryTime) ? 145 : 0) +
        (data.gatekeeper ? 33 : 0) +
        (((_c = data.gatekeeper) === null || _c === void 0 ? void 0 : _c.expireOnUse) ? 66 : 0);
    loglevel_1.default.info('Transaction size estimate: ', txnEstimate);
    const INIT_INSTRUCTIONS_LENGTH = 4;
    const INIT_SIGNERS_LENGTH = 1;
    let initInstructions = [];
    let initSigners = [];
    if (txnEstimate > 1230) {
        initInstructions = instructions.splice(0, INIT_INSTRUCTIONS_LENGTH);
        initSigners = signers.splice(0, INIT_SIGNERS_LENGTH);
    }
    if (initInstructions.length > 0) {
        await (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, initInstructions, initSigners);
    }
    const mainInstructions = (await (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, instructions, signers)).txid;
    if (cleanupInstructions.length > 0) {
        await (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, cleanupInstructions, []);
    }
    return mainInstructions;
}
exports.mintV2 = mintV2;
