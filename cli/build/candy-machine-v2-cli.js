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
const path = __importStar(require("path"));
const commander_1 = require("commander");
const web3_js_1 = require("@solana/web3.js");
// import {
//   CACHE_PATH
// } from './helpers/constants';
const mint_1 = require("./commands/mint");
const loglevel_1 = __importDefault(require("loglevel"));
const accounts_1 = require("./helpers/accounts");
commander_1.program.version('0.0.2');
// if (!fs.existsSync(CACHE_PATH)) {
//   fs.mkdirSync(CACHE_PATH);
// }
loglevel_1.default.setLevel(loglevel_1.default.levels.INFO);
programCommand('mint_one_token')
    .action(async (_, cmd) => {
    let currentDir = process.cwd();
    let walletsDir = currentDir + "/config/wallet";
    const wallets = fs.readdirSync(walletsDir).map(file => path.join(walletsDir, file));
    if (wallets.length <= 0) {
        loglevel_1.default.info("please input your walllet file into config/wallets");
        return;
    }
    let configData = JSON.parse(fs.readFileSync(currentDir + "/config/config.json").toString());
    loglevel_1.default.info("config is : " + JSON.stringify(configData));
    const servers = configData.server_endpoint.split(",");
    const candyMachine = new web3_js_1.PublicKey(configData.candy_machine_address);
    for (let index = 0; index < wallets.length; index++) {
        const rpcUrl = servers[index % servers.length];
        const walletPath = wallets[index];
        let keypair = (0, accounts_1.loadWalletKey)(walletPath);
        const tx = await (0, mint_1.mintV2)(keypair, candyMachine, rpcUrl);
        loglevel_1.default.info('mint_one_token server: ' + rpcUrl + ',  wallet: ' + index + ' finished', tx);
    }
});
function programCommand(name, options = { requireWallet: true }) {
    let cmProgram = commander_1.program.command(name);
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
