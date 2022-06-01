#!/usr/bin/env ts-node
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
const fs = __importStar(require("fs"));
const commander_1 = require("commander");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("./helpers/constants");
const mint_1 = require("./commands/mint");
const loglevel_1 = __importDefault(require("loglevel"));
commander_1.program.version('0.0.2');
if (!fs.existsSync(constants_1.CACHE_PATH)) {
    fs.mkdirSync(constants_1.CACHE_PATH);
}
loglevel_1.default.setLevel(loglevel_1.default.levels.INFO);
programCommand('mint_one_token')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(async (directory, cmd) => {
    const { keypair, env, candy, rpcUrl } = cmd.opts();
    const candyMachine = new web3_js_1.PublicKey(candy);
    const tx = await (0, mint_1.mintV2)(keypair, env, candyMachine, rpcUrl);
    loglevel_1.default.info('mint_one_token finished', tx);
});
programCommand('mint_multiple_tokens')
    .requiredOption('-n, --number <string>', 'Number of tokens')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(async (_, cmd) => {
    const { keypair, env, candy, number, rpcUrl } = cmd.opts();
    const NUMBER_OF_NFTS_TO_MINT = parseInt(number, 10);
    const candyMachine = new web3_js_1.PublicKey(candy);
    loglevel_1.default.info(`Minting ${NUMBER_OF_NFTS_TO_MINT} tokens...`);
    const mintToken = async (index) => {
        const tx = await (0, mint_1.mintV2)(keypair, env, candyMachine, rpcUrl);
        loglevel_1.default.info(`transaction ${index + 1} complete`, tx);
        if (index < NUMBER_OF_NFTS_TO_MINT - 1) {
            loglevel_1.default.info('minting another token...');
            await mintToken(index + 1);
        }
    };
    await mintToken(0);
    loglevel_1.default.info(`minted ${NUMBER_OF_NFTS_TO_MINT} tokens`);
    loglevel_1.default.info('mint_multiple_tokens finished');
});
function programCommand(name, options = { requireWallet: true }) {
    let cmProgram = commander_1.program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-candy, --candy <string>', 'candy machine address', '')
        .option('-l, --log-level <string>', 'log level', setLogLevel)
        .option('-c, --cache-name <string>', 'Cache file name', 'temp');
    if (options.requireWallet) {
        cmProgram = cmProgram.requiredOption('-k, --keypair <path>', `Solana wallet location`);
    }
    return cmProgram;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
    if (value === undefined || value === null) {
        return;
    }
    loglevel_1.default.info('setting the log value to: ' + value);
    loglevel_1.default.setLevel(value);
}
commander_1.program.parse(process.argv);
