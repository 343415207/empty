#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
import {IMintConfig} from './config/config'
import { PublicKey } from '@solana/web3.js';
// import {
//   CACHE_PATH
// } from './helpers/constants';


import { mintV2 } from './commands/mint';
import log from 'loglevel';

import {loadWalletKey} from './helpers/accounts'

program.version('0.0.2');

// if (!fs.existsSync(CACHE_PATH)) {
//   fs.mkdirSync(CACHE_PATH);
// }
log.setLevel(log.levels.INFO);

programCommand('mint')
  .action(async (_, cmd) => {
    
    let currentDir:string = process.cwd();
    let walletsDir:string =   currentDir + "/config/wallet";
    
    const wallets:string[] = fs.readdirSync(walletsDir).map(file => path.join(walletsDir, file));

    if(wallets.length<=0) {
        log.info("please input your walllet file into config/wallets");
        return
    }
    
    let configData:IMintConfig  = JSON.parse(fs.readFileSync(currentDir + "/config/config.json").toString());

    log.info("config is : " + JSON.stringify(configData));
    
    const servers:string[] = configData.server_endpoint.split(",");

    const candyMachine = new PublicKey(configData.candy_machine_address);
      for (let index = 0; index < wallets.length; index++) {
        const rpcUrl = servers[index%servers.length]; 
        const walletPath = wallets[index];
        let keypair = loadWalletKey(walletPath)
        const tx = await mintV2(keypair, candyMachine, rpcUrl);
        log.info('mint_one_token server: '  + rpcUrl  + ',  wallet: ' + index  + ' finished', tx);
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
