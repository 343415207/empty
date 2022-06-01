#!/usr/bin/env ts-node
import * as fs from 'fs';
import { program } from 'commander';

import { PublicKey } from '@solana/web3.js';
import {
  CACHE_PATH
} from './helpers/constants';


import { mintV2 } from './commands/mint';
import log from 'loglevel';

program.version('0.0.2');

if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH);
}
log.setLevel(log.levels.INFO);

programCommand('mint_one_token')
  .option(
    '-r, --rpc-url <string>',
    'custom rpc url since this is a heavy command',
  )
  .action(async (directory, cmd) => {
    const { keypair, env, candy, rpcUrl } = cmd.opts();
    const candyMachine = new PublicKey(candy);
    const tx = await mintV2(keypair, env, candyMachine, rpcUrl);

    log.info('mint_one_token finished', tx);
  });

programCommand('mint_multiple_tokens')
  .requiredOption('-n, --number <string>', 'Number of tokens')
  .option(
    '-r, --rpc-url <string>',
    'custom rpc url since this is a heavy command',
  )
  .action(async (_, cmd) => {
    const { keypair, env, candy, number, rpcUrl } = cmd.opts();

    const NUMBER_OF_NFTS_TO_MINT = parseInt(number, 10);
    const candyMachine = new PublicKey(candy);
    log.info(`Minting ${NUMBER_OF_NFTS_TO_MINT} tokens...`);

    const mintToken = async index => {
      const tx = await mintV2(keypair, env, candyMachine, rpcUrl);
      log.info(`transaction ${index + 1} complete`, tx);

      if (index < NUMBER_OF_NFTS_TO_MINT - 1) {
        log.info('minting another token...');
        await mintToken(index + 1);
      }
    };

    await mintToken(0);

    log.info(`minted ${NUMBER_OF_NFTS_TO_MINT} tokens`);
    log.info('mint_multiple_tokens finished');
  });

function programCommand(
  name: string,
  options: { requireWallet: boolean } = { requireWallet: true },
) {
  let cmProgram = program
    .command(name)
    .option(
      '-e, --env <string>',
      'Solana cluster env name',
      'devnet', //mainnet-beta, testnet, devnet
    )
    .option(
      '-candy, --candy <string>',
      'candy machine address',
      '',
    )
    .option('-l, --log-level <string>', 'log level', setLogLevel)
    .option('-c, --cache-name <string>', 'Cache file name', 'temp');

  if (options.requireWallet) {
    cmProgram = cmProgram.requiredOption(
      '-k, --keypair <path>',
      `Solana wallet location`,
    );
  }

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
