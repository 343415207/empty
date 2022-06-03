#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
import { IMintConfig } from './config/config'
import { PublicKey } from '@solana/web3.js';
// import {
//   CACHE_PATH
// } from './helpers/constants';


import {mint, mintV2 } from './commands/mint';
import log from 'loglevel';

import { loadWalletKey } from './helpers/accounts'

program.version('0.0.2');

// if (!fs.existsSync(CACHE_PATH)) {
//   fs.mkdirSync(CACHE_PATH);
// }
log.setLevel(log.levels.INFO);

const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}
// 调用方法；

programCommand('mint')
  .requiredOption('-t, --time <number>', 'start time', "")
  .action(async (_, cmd) => {

    let currentDir: string = process.cwd();
    let walletsDir: string = currentDir + "/config/wallet";

    const wallets: string[] = fs.readdirSync(walletsDir).map(file => path.join(walletsDir, file));

    if (wallets.length <= 0) {
      log.info("please input your walllet file into config/wallets");
      return
    }

    let configData: IMintConfig = JSON.parse(fs.readFileSync(currentDir + "/config/config.json").toString());

    log.info("config is : " + JSON.stringify(configData));

    const servers: string[] = configData.server_endpoint.split(",");

    const candyMachine = new PublicKey(configData.candy_machine_address);

    const configAddress = new PublicKey("qbTbipGCCN4dTKxtN3guNbPizV8wmhvKoPUW5NkJhuE");

    const currentTimestamp = new Date().getTime()
    const { time } = cmd.opts();
    const times = time - currentTimestamp;
    const days = Math.floor(times / (24 * 3600 * 1000))
    let leave = times % (24 * 3600 * 1000)  
    let hours = Math.floor(leave / (3600 * 1000))
    leave = leave % (3600 * 1000) 
    let minutes = Math.floor(leave / (60 * 1000))
    leave = leave % (60 * 1000) 
    let seconds = Math.round(leave / 1000)

    log.info(`current timestamp is ${currentTimestamp}, mint will start after: `, `${days}d:${hours}h:${minutes}m:${seconds}s`)
    await sleep(times);
    log.info("begin mint---")

    for (let index = 0; index < wallets.length; index++) {
      const rpcUrl = servers[index % servers.length];
      const walletPath = wallets[index];
      let keypair = loadWalletKey(walletPath)
      const tx = await mint(
        keypair,
        configAddress,
        "FSL1gB",
        rpcUrl,
      )
      log.info('mint_one_token server: ' + rpcUrl + ',  wallet: ' + index + ' finished', tx);
    }
  });

function programCommand(
  name: string,
  options: { requireWallet: boolean } = { requireWallet: true },
) {
  let cmProgram = program.command(name)
  return cmProgram;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
  if (value === undefined || value === null) {
    return;
  }
  log.info('setting the log value to: ' + value);
  log.setLevel(value);
}

program.parse(process.argv);
