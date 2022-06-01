#!/usr/bin/env ts-node
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
define("helpers/constants", ["require", "exports", "@solana/web3.js"], function (require, exports, web3_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_CLUSTER = exports.CLUSTERS = exports.EXTENSION_JSON = exports.EXTENSION_HTML = exports.EXTENSION_GLB = exports.EXTENSION_WAV = exports.EXTENSION_FLAC = exports.EXTENSION_MP3 = exports.EXTENSION_MOV = exports.EXTENSION_MP4 = exports.EXTENSION_GIF = exports.EXTENSION_JPG = exports.EXTENSION_PNG = exports.DEFAULT_TIMEOUT = exports.CACHE_PATH = exports.CONFIG_LINE_SIZE = exports.CONFIG_LINE_SIZE_V2 = exports.CONFIG_ARRAY_START_V2 = exports.CONFIG_ARRAY_START = exports.WRAPPED_SOL_MINT = exports.TOKEN_ENTANGLEMENT_PROGRAM_ID = exports.AUCTION_HOUSE_PROGRAM_ID = exports.FAIR_LAUNCH_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = exports.TOKEN_METADATA_PROGRAM_ID = exports.CANDY_MACHINE_PROGRAM_V2_ID = exports.CANDY_MACHINE_PROGRAM_ID = exports.ARWEAVE_PAYMENT_WALLET = exports.MAX_CREATOR_LIMIT = exports.MAX_CREATOR_LEN = exports.MAX_SYMBOL_LENGTH = exports.MAX_URI_LENGTH = exports.MAX_NAME_LENGTH = exports.TREASURY = exports.FEE_PAYER = exports.B = exports.A = exports.ESCROW = exports.TOKEN_ENTANGLER = exports.AUCTION_HOUSE = exports.CANDY_MACHINE = void 0;
    exports.CANDY_MACHINE = 'candy_machine';
    exports.AUCTION_HOUSE = 'auction_house';
    exports.TOKEN_ENTANGLER = 'token_entangler';
    exports.ESCROW = 'escrow';
    exports.A = 'A';
    exports.B = 'B';
    exports.FEE_PAYER = 'fee_payer';
    exports.TREASURY = 'treasury';
    exports.MAX_NAME_LENGTH = 32;
    exports.MAX_URI_LENGTH = 200;
    exports.MAX_SYMBOL_LENGTH = 10;
    exports.MAX_CREATOR_LEN = 32 + 1 + 1;
    exports.MAX_CREATOR_LIMIT = 5;
    exports.ARWEAVE_PAYMENT_WALLET = new web3_js_1.PublicKey('6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS');
    exports.CANDY_MACHINE_PROGRAM_ID = new web3_js_1.PublicKey('cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ');
    exports.CANDY_MACHINE_PROGRAM_V2_ID = new web3_js_1.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ');
    exports.TOKEN_METADATA_PROGRAM_ID = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3_js_1.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
    exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
    exports.FAIR_LAUNCH_PROGRAM_ID = new web3_js_1.PublicKey('faircnAB9k59Y4TXmLabBULeuTLgV7TkGMGNkjnA15j');
    exports.AUCTION_HOUSE_PROGRAM_ID = new web3_js_1.PublicKey('hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk');
    exports.TOKEN_ENTANGLEMENT_PROGRAM_ID = new web3_js_1.PublicKey('qntmGodpGkrM42mN68VCZHXnKqDCT8rdY23wFcXCLPd');
    exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
    exports.CONFIG_ARRAY_START = 32 + // authority
        4 +
        6 + // uuid + u32 len
        4 +
        10 + // u32 len + symbol
        2 + // seller fee basis points
        1 +
        4 +
        5 * 34 + // optional + u32 len + actual vec
        8 + //max supply
        1 + //is mutable
        1 + // retain authority
        4; // max number of lines;
    exports.CONFIG_ARRAY_START_V2 = 8 + // key
        32 + // authority
        32 + //wallet
        33 + // token mint
        4 +
        6 + // uuid
        8 + // price
        8 + // items available
        9 + // go live
        10 + // end settings
        4 +
        exports.MAX_SYMBOL_LENGTH + // u32 len + symbol
        2 + // seller fee basis points
        4 +
        exports.MAX_CREATOR_LIMIT * exports.MAX_CREATOR_LEN + // optional + u32 len + actual vec
        8 + //max supply
        1 + // is mutable
        1 + // retain authority
        1 + // option for hidden setting
        4 +
        exports.MAX_NAME_LENGTH + // name length,
        4 +
        exports.MAX_URI_LENGTH + // uri length,
        32 + // hash
        4 + // max number of lines;
        8 + // items redeemed
        1 + // whitelist option
        1 + // whitelist mint mode
        1 + // allow presale
        9 + // discount price
        32 + // mint key for whitelist
        1 +
        32 +
        1; // gatekeeper
    exports.CONFIG_LINE_SIZE_V2 = 4 + 32 + 4 + 200;
    exports.CONFIG_LINE_SIZE = 4 + 32 + 4 + 200;
    exports.CACHE_PATH = './.cache';
    exports.DEFAULT_TIMEOUT = 30000;
    exports.EXTENSION_PNG = '.png';
    exports.EXTENSION_JPG = '.jpg';
    exports.EXTENSION_GIF = '.gif';
    exports.EXTENSION_MP4 = '.mp4';
    exports.EXTENSION_MOV = '.mov';
    exports.EXTENSION_MP3 = '.mp3';
    exports.EXTENSION_FLAC = '.flac';
    exports.EXTENSION_WAV = '.wav';
    exports.EXTENSION_GLB = '.glb';
    exports.EXTENSION_HTML = '.html';
    exports.EXTENSION_JSON = '.json';
    exports.CLUSTERS = [
        {
            name: 'mainnet-beta',
            url: 'https://api.metaplex.solana.com/',
        },
        {
            name: 'testnet',
            url: (0, web3_js_1.clusterApiUrl)('testnet'),
        },
        {
            name: 'devnet',
            url: (0, web3_js_1.clusterApiUrl)('devnet'),
        },
    ];
    exports.DEFAULT_CLUSTER = exports.CLUSTERS[2];
});
define("helpers/cache", ["require", "exports", "fs", "path", "helpers/constants"], function (require, exports, fs_1, path_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.saveCache = exports.loadCache = exports.cachePath = void 0;
    fs_1 = __importDefault(fs_1);
    path_1 = __importDefault(path_1);
    function cachePath(env, cacheName, cPath = constants_1.CACHE_PATH, legacy = false) {
        const filename = `${env}-${cacheName}`;
        return path_1.default.join(cPath, legacy ? filename : `${filename}.json`);
    }
    exports.cachePath = cachePath;
    function loadCache(cacheName, env, cPath = constants_1.CACHE_PATH, legacy = false) {
        const path = cachePath(env, cacheName, cPath, legacy);
        if (!fs_1.default.existsSync(path)) {
            if (!legacy) {
                return loadCache(cacheName, env, cPath, true);
            }
            return undefined;
        }
        return JSON.parse(fs_1.default.readFileSync(path).toString());
    }
    exports.loadCache = loadCache;
    function saveCache(cacheName, env, cacheContent, cPath = constants_1.CACHE_PATH) {
        cacheContent.env = env;
        cacheContent.cacheName = cacheName;
        fs_1.default.writeFileSync(cachePath(env, cacheName, cPath), JSON.stringify(cacheContent));
    }
    exports.saveCache = saveCache;
});
define("helpers/instructions", ["require", "exports", "@solana/web3.js", "helpers/constants", "@project-serum/anchor"], function (require, exports, web3_js_2, constants_2, anchor) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCandyMachineV2Account = exports.createUpdateMetadataInstruction = exports.createAssociatedTokenAccountInstruction = void 0;
    anchor = __importStar(anchor);
    function createAssociatedTokenAccountInstruction(associatedTokenAddress, payer, walletAddress, splTokenMintAddress) {
        const keys = [
            {
                pubkey: payer,
                isSigner: true,
                isWritable: true,
            },
            {
                pubkey: associatedTokenAddress,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: walletAddress,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: splTokenMintAddress,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_2.SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: constants_2.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_2.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new web3_js_2.TransactionInstruction({
            keys,
            programId: constants_2.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
            data: Buffer.from([]),
        });
    }
    exports.createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction;
    function createUpdateMetadataInstruction(metadataAccount, payer, txnData) {
        const keys = [
            {
                pubkey: metadataAccount,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: payer,
                isSigner: true,
                isWritable: false,
            },
        ];
        return new web3_js_2.TransactionInstruction({
            keys,
            programId: constants_2.TOKEN_METADATA_PROGRAM_ID,
            data: txnData,
        });
    }
    exports.createUpdateMetadataInstruction = createUpdateMetadataInstruction;
    async function createCandyMachineV2Account(anchorProgram, candyData, payerWallet, candyAccount) {
        const size = constants_2.CONFIG_ARRAY_START_V2 +
            4 +
            candyData.itemsAvailable.toNumber() * constants_2.CONFIG_LINE_SIZE_V2 +
            8 +
            2 * (Math.floor(candyData.itemsAvailable.toNumber() / 8) + 1);
        return anchor.web3.SystemProgram.createAccount({
            fromPubkey: payerWallet,
            newAccountPubkey: candyAccount,
            space: size,
            lamports: await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(size),
            programId: constants_2.CANDY_MACHINE_PROGRAM_V2_ID,
        });
    }
    exports.createCandyMachineV2Account = createCandyMachineV2Account;
});
define("helpers/storage-type", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorageType = void 0;
    var StorageType;
    (function (StorageType) {
        StorageType["ArweaveBundle"] = "arweave-bundle";
        StorageType["ArweaveSol"] = "arweave-sol";
        StorageType["Arweave"] = "arweave";
        StorageType["Ipfs"] = "ipfs";
        StorageType["Aws"] = "aws";
        StorageType["NftStorage"] = "nft-storage";
        StorageType["Pinata"] = "pinata";
    })(StorageType = exports.StorageType || (exports.StorageType = {}));
});
define("helpers/various", ["require", "exports", "@solana/web3.js", "fs", "loglevel", "@project-serum/anchor", "@solana/spl-token", "helpers/accounts", "helpers/constants", "@metaplex-foundation/mpl-token-metadata"], function (require, exports, web3_js_3, fs_2, loglevel_1, anchor_1, spl_token_1, accounts_1, constants_3, mpl_token_metadata_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCollectionMintPubkey = exports.parseUses = exports.getCluster = exports.getPriceWithMantissa = exports.chunks = exports.getMultipleAccounts = exports.parseDate = exports.parsePrice = exports.fromUTF8Array = exports.sleep = exports.getUnixTs = exports.shuffle = exports.getCandyMachineV2Config = void 0;
    fs_2 = __importDefault(fs_2);
    loglevel_1 = __importDefault(loglevel_1);
    async function getCandyMachineV2Config(walletKeyPair, anchorProgram, configPath) {
        if (configPath === undefined) {
            throw new Error('The configPath is undefined');
        }
        const configString = fs_2.default.readFileSync(configPath);
        //@ts-ignore
        const config = JSON.parse(configString);
        const { storage, nftStorageKey, nftStorageGateway, ipfsInfuraProjectId, number, ipfsInfuraSecret, pinataJwt, pinataGateway, awsS3Bucket, noRetainAuthority, noMutable, batchSize, price, splToken, splTokenAccount, solTreasuryAccount, gatekeeper, endSettings, hiddenSettings, whitelistMintSettings, goLiveDate, uuid, arweaveJwk, } = config;
        let wallet;
        let parsedPrice = price;
        const splTokenAccountFigured = splTokenAccount
            ? splTokenAccount
            : splToken
                ? (await (0, accounts_1.getAtaForMint)(new anchor_1.web3.PublicKey(splToken), walletKeyPair.publicKey))[0]
                : null;
        if (splTokenAccount) {
            if (solTreasuryAccount) {
                throw new Error('If spl-token-account or spl-token is set then sol-treasury-account cannot be set');
            }
            if (!splToken) {
                throw new Error('If spl-token-account is set, spl-token must also be set');
            }
            const splTokenKey = new anchor_1.web3.PublicKey(splToken);
            const splTokenAccountKey = new anchor_1.web3.PublicKey(splTokenAccountFigured);
            if (!splTokenAccountFigured) {
                throw new Error('If spl-token is set, spl-token-account must also be set');
            }
            const token = new spl_token_1.Token(anchorProgram.provider.connection, splTokenKey, spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
            const mintInfo = await token.getMintInfo();
            if (!mintInfo.isInitialized) {
                throw new Error(`The specified spl-token is not initialized`);
            }
            const tokenAccount = await token.getAccountInfo(splTokenAccountKey);
            if (!tokenAccount.isInitialized) {
                throw new Error(`The specified spl-token-account is not initialized`);
            }
            if (!tokenAccount.mint.equals(splTokenKey)) {
                throw new Error(`The spl-token-account's mint (${tokenAccount.mint.toString()}) does not match specified spl-token ${splTokenKey.toString()}`);
            }
            wallet = new anchor_1.web3.PublicKey(splTokenAccountKey);
            parsedPrice = price * 10 ** mintInfo.decimals;
            if ((whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) ||
                (whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) === 0) {
                whitelistMintSettings.discountPrice *= 10 ** mintInfo.decimals;
            }
        }
        else {
            parsedPrice = price * 10 ** 9;
            if ((whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) ||
                (whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) === 0) {
                whitelistMintSettings.discountPrice *= 10 ** 9;
            }
            wallet = solTreasuryAccount
                ? new anchor_1.web3.PublicKey(solTreasuryAccount)
                : walletKeyPair.publicKey;
        }
        if (whitelistMintSettings) {
            whitelistMintSettings.mint = new anchor_1.web3.PublicKey(whitelistMintSettings.mint);
            if ((whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) ||
                (whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) === 0) {
                whitelistMintSettings.discountPrice = new anchor_1.BN(whitelistMintSettings.discountPrice);
            }
        }
        if (endSettings) {
            if (endSettings.endSettingType.date) {
                endSettings.number = new anchor_1.BN(parseDate(endSettings.value));
            }
            else if (endSettings.endSettingType.amount) {
                endSettings.number = new anchor_1.BN(endSettings.value);
            }
            delete endSettings.value;
        }
        if (hiddenSettings) {
            const utf8Encode = new TextEncoder();
            hiddenSettings.hash = utf8Encode.encode(hiddenSettings.hash);
        }
        if (gatekeeper) {
            gatekeeper.gatekeeperNetwork = new anchor_1.web3.PublicKey(gatekeeper.gatekeeperNetwork);
        }
        return {
            storage,
            nftStorageKey,
            nftStorageGateway,
            ipfsInfuraProjectId,
            number,
            ipfsInfuraSecret,
            pinataJwt,
            pinataGateway: pinataGateway ? pinataGateway : null,
            awsS3Bucket,
            retainAuthority: !noRetainAuthority,
            mutable: !noMutable,
            batchSize,
            price: new anchor_1.BN(parsedPrice),
            treasuryWallet: wallet,
            splToken: splToken ? new anchor_1.web3.PublicKey(splToken) : null,
            gatekeeper,
            endSettings,
            hiddenSettings,
            whitelistMintSettings,
            goLiveDate: goLiveDate ? new anchor_1.BN(parseDate(goLiveDate)) : null,
            uuid,
            arweaveJwk,
        };
    }
    exports.getCandyMachineV2Config = getCandyMachineV2Config;
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }
    exports.shuffle = shuffle;
    const getUnixTs = () => {
        return new Date().getTime() / 1000;
    };
    exports.getUnixTs = getUnixTs;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    exports.sleep = sleep;
    function fromUTF8Array(data) {
        // array of bytes
        let str = '', i;
        for (i = 0; i < data.length; i++) {
            const value = data[i];
            if (value < 0x80) {
                str += String.fromCharCode(value);
            }
            else if (value > 0xbf && value < 0xe0) {
                str += String.fromCharCode(((value & 0x1f) << 6) | (data[i + 1] & 0x3f));
                i += 1;
            }
            else if (value > 0xdf && value < 0xf0) {
                str += String.fromCharCode(((value & 0x0f) << 12) |
                    ((data[i + 1] & 0x3f) << 6) |
                    (data[i + 2] & 0x3f));
                i += 2;
            }
            else {
                // surrogate pair
                const charCode = (((value & 0x07) << 18) |
                    ((data[i + 1] & 0x3f) << 12) |
                    ((data[i + 2] & 0x3f) << 6) |
                    (data[i + 3] & 0x3f)) -
                    0x010000;
                str += String.fromCharCode((charCode >> 10) | 0xd800, (charCode & 0x03ff) | 0xdc00);
                i += 3;
            }
        }
        return str;
    }
    exports.fromUTF8Array = fromUTF8Array;
    function parsePrice(price, mantissa = web3_js_3.LAMPORTS_PER_SOL) {
        return Math.ceil(parseFloat(price) * mantissa);
    }
    exports.parsePrice = parsePrice;
    function parseDate(date) {
        if (date === 'now') {
            return Date.now() / 1000;
        }
        return Date.parse(date) / 1000;
    }
    exports.parseDate = parseDate;
    const getMultipleAccounts = async (connection, keys, commitment) => {
        const result = await Promise.all(chunks(keys, 99).map(chunk => getMultipleAccountsCore(connection, chunk, commitment)));
        const array = result
            .map(a => 
        //@ts-ignore
        a.array.map(acc => {
            if (!acc) {
                return undefined;
            }
            const { data, ...rest } = acc;
            const obj = {
                ...rest,
                data: Buffer.from(data[0], 'base64'),
            };
            return obj;
        }))
            //@ts-ignore
            .flat();
        return { keys, array };
    };
    exports.getMultipleAccounts = getMultipleAccounts;
    function chunks(array, size) {
        return Array.apply(0, new Array(Math.ceil(array.length / size))).map((_, index) => array.slice(index * size, (index + 1) * size));
    }
    exports.chunks = chunks;
    const getMultipleAccountsCore = async (connection, keys, commitment) => {
        const args = connection._buildArgs([keys], commitment, 'base64');
        const unsafeRes = await connection._rpcRequest('getMultipleAccounts', args);
        if (unsafeRes.error) {
            throw new Error('failed to get info about account ' + unsafeRes.error.message);
        }
        if (unsafeRes.result.value) {
            const array = unsafeRes.result.value;
            return { keys, array };
        }
        // TODO: fix
        throw new Error();
    };
    const getPriceWithMantissa = async (price, mint, walletKeyPair, anchorProgram) => {
        const token = new spl_token_1.Token(anchorProgram.provider.connection, new anchor_1.web3.PublicKey(mint), spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
        const mintInfo = await token.getMintInfo();
        const mantissa = 10 ** mintInfo.decimals;
        return Math.ceil(price * mantissa);
    };
    exports.getPriceWithMantissa = getPriceWithMantissa;
    function getCluster(name) {
        if (name === '') {
            loglevel_1.default.info('Using cluster', constants_3.DEFAULT_CLUSTER.name);
            return constants_3.DEFAULT_CLUSTER.url;
        }
        for (const cluster of constants_3.CLUSTERS) {
            if (cluster.name === name) {
                loglevel_1.default.info('Using cluster', cluster.name);
                return cluster.url;
            }
        }
        throw new Error(`Could not get cluster: ${name}`);
        return null;
    }
    exports.getCluster = getCluster;
    function parseUses(useMethod, total) {
        if (!!useMethod && !!total) {
            const realUseMethod = mpl_token_metadata_1.UseMethod[useMethod];
            if (!realUseMethod) {
                throw new Error(`Invalid use method: ${useMethod}`);
            }
            return new mpl_token_metadata_1.Uses({ useMethod: realUseMethod, total, remaining: total });
        }
        return null;
    }
    exports.parseUses = parseUses;
    async function parseCollectionMintPubkey(collectionMint, connection, walletKeypair) {
        let collectionMintPubkey = null;
        if (collectionMint) {
            try {
                collectionMintPubkey = new web3_js_3.PublicKey(collectionMint);
            }
            catch (error) {
                throw new Error('Invalid Pubkey option. Please enter it as a base58 mint id');
            }
            const token = new spl_token_1.Token(connection, collectionMintPubkey, spl_token_1.TOKEN_PROGRAM_ID, walletKeypair);
            await token.getMintInfo();
        }
        if (collectionMintPubkey) {
            const metadata = await mpl_token_metadata_1.Metadata.findByMint(connection, collectionMintPubkey).catch();
            if (metadata.data.updateAuthority !== walletKeypair.publicKey.toString()) {
                throw new Error('Invalid collection mint option. Metadata update authority does not match provided wallet keypair');
            }
            const edition = await mpl_token_metadata_1.Metadata.getEdition(connection, collectionMintPubkey);
            if (edition.data.key !== mpl_token_metadata_1.MetadataKey.MasterEditionV1 &&
                edition.data.key !== mpl_token_metadata_1.MetadataKey.MasterEditionV2) {
                throw new Error('Invalid collection mint. Provided collection mint does not have a master edition associated with it.');
            }
        }
        return collectionMintPubkey;
    }
    exports.parseCollectionMintPubkey = parseCollectionMintPubkey;
});
define("helpers/accounts", ["require", "exports", "@solana/web3.js", "helpers/constants", "@project-serum/anchor", "fs", "helpers/instructions", "loglevel", "@solana/spl-token", "helpers/various", "@project-serum/anchor/dist/cjs/utils/bytes"], function (require, exports, web3_js_4, constants_4, anchor, fs_3, instructions_1, loglevel_2, spl_token_2, various_1, bytes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProgramAccounts = exports.getBalance = exports.getTokenAmount = exports.loadTokenEntanglementProgream = exports.loadAuctionHouseProgram = exports.loadFairLaunchProgram = exports.loadCandyProgramV2 = exports.loadCandyProgram = exports.loadWalletKey = exports.getTokenEntanglementEscrows = exports.getTokenEntanglement = exports.getAuctionHouseTradeState = exports.getAuctionHouseBuyerEscrow = exports.getAuctionHouseTreasuryAcct = exports.getAuctionHouseFeeAcct = exports.getAuctionHouseProgramAsSigner = exports.getAuctionHouse = exports.getEditionMarkPda = exports.getMasterEdition = exports.getCollectionAuthorityRecordPDA = exports.getCollectionPDA = exports.getMetadata = exports.getTreasury = exports.getParticipationToken = exports.getParticipationMint = exports.getAtaForMint = exports.getFairLaunchTicketSeqLookup = exports.getFairLaunchLotteryBitmap = exports.getFairLaunchTicket = exports.getCandyMachineCreator = exports.getFairLaunch = exports.getTokenMint = exports.deriveCandyMachineV2ProgramAddress = exports.getCandyMachineAddress = exports.getTokenWallet = exports.uuidFromConfigPubkey = exports.createCandyMachineV2 = exports.deserializeAccount = void 0;
    anchor = __importStar(anchor);
    fs_3 = __importDefault(fs_3);
    loglevel_2 = __importDefault(loglevel_2);
    // TODO: expose in spl package
    const deserializeAccount = (data) => {
        const accountInfo = spl_token_2.AccountLayout.decode(data);
        accountInfo.mint = new web3_js_4.PublicKey(accountInfo.mint);
        accountInfo.owner = new web3_js_4.PublicKey(accountInfo.owner);
        accountInfo.amount = spl_token_2.u64.fromBuffer(accountInfo.amount);
        if (accountInfo.delegateOption === 0) {
            accountInfo.delegate = null;
            accountInfo.delegatedAmount = new spl_token_2.u64(0);
        }
        else {
            accountInfo.delegate = new web3_js_4.PublicKey(accountInfo.delegate);
            accountInfo.delegatedAmount = spl_token_2.u64.fromBuffer(accountInfo.delegatedAmount);
        }
        accountInfo.isInitialized = accountInfo.state !== 0;
        accountInfo.isFrozen = accountInfo.state === 2;
        if (accountInfo.isNativeOption === 1) {
            accountInfo.rentExemptReserve = spl_token_2.u64.fromBuffer(accountInfo.isNative);
            accountInfo.isNative = true;
        }
        else {
            accountInfo.rentExemptReserve = null;
            accountInfo.isNative = false;
        }
        if (accountInfo.closeAuthorityOption === 0) {
            accountInfo.closeAuthority = null;
        }
        else {
            accountInfo.closeAuthority = new web3_js_4.PublicKey(accountInfo.closeAuthority);
        }
        return accountInfo;
    };
    exports.deserializeAccount = deserializeAccount;
    const createCandyMachineV2 = async function (anchorProgram, payerWallet, treasuryWallet, splToken, candyData) {
        const candyAccount = web3_js_4.Keypair.generate();
        candyData.uuid = uuidFromConfigPubkey(candyAccount.publicKey);
        if (!candyData.symbol) {
            throw new Error(`Invalid config, there must be a symbol.`);
        }
        if (!candyData.creators || candyData.creators.length === 0) {
            throw new Error(`Invalid config, there must be at least one creator.`);
        }
        const totalShare = (candyData.creators || []).reduce((acc, curr) => acc + curr.share, 0);
        if (totalShare !== 100) {
            throw new Error(`Invalid config, creators shares must add up to 100`);
        }
        const remainingAccounts = [];
        if (splToken) {
            remainingAccounts.push({
                pubkey: splToken,
                isSigner: false,
                isWritable: false,
            });
        }
        return {
            candyMachine: candyAccount.publicKey,
            uuid: candyData.uuid,
            txId: await anchorProgram.rpc.initializeCandyMachine(candyData, {
                accounts: {
                    candyMachine: candyAccount.publicKey,
                    wallet: treasuryWallet,
                    authority: payerWallet.publicKey,
                    payer: payerWallet.publicKey,
                    systemProgram: web3_js_4.SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                },
                signers: [payerWallet, candyAccount],
                remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
                instructions: [
                    await (0, instructions_1.createCandyMachineV2Account)(anchorProgram, candyData, payerWallet.publicKey, candyAccount.publicKey),
                ],
            }),
        };
    };
    exports.createCandyMachineV2 = createCandyMachineV2;
    function uuidFromConfigPubkey(configAccount) {
        return configAccount.toBase58().slice(0, 6);
    }
    exports.uuidFromConfigPubkey = uuidFromConfigPubkey;
    const getTokenWallet = async function (wallet, mint) {
        return (await web3_js_4.PublicKey.findProgramAddress([wallet.toBuffer(), constants_4.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], constants_4.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID))[0];
    };
    exports.getTokenWallet = getTokenWallet;
    const getCandyMachineAddress = async (config, uuid) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from(constants_4.CANDY_MACHINE), config.toBuffer(), Buffer.from(uuid)], constants_4.CANDY_MACHINE_PROGRAM_ID);
    };
    exports.getCandyMachineAddress = getCandyMachineAddress;
    const deriveCandyMachineV2ProgramAddress = async (candyMachineId) => {
        return await web3_js_4.PublicKey.findProgramAddress([Buffer.from(constants_4.CANDY_MACHINE), candyMachineId.toBuffer()], constants_4.CANDY_MACHINE_PROGRAM_V2_ID);
    };
    exports.deriveCandyMachineV2ProgramAddress = deriveCandyMachineV2ProgramAddress;
    const getTokenMint = async (authority, uuid) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('fair_launch'),
            authority.toBuffer(),
            Buffer.from('mint'),
            Buffer.from(uuid),
        ], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getTokenMint = getTokenMint;
    const getFairLaunch = async (tokenMint) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('fair_launch'), tokenMint.toBuffer()], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getFairLaunch = getFairLaunch;
    const getCandyMachineCreator = async (candyMachine) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('candy_machine'), candyMachine.toBuffer()], constants_4.CANDY_MACHINE_PROGRAM_V2_ID);
    };
    exports.getCandyMachineCreator = getCandyMachineCreator;
    const getFairLaunchTicket = async (tokenMint, buyer) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('fair_launch'), tokenMint.toBuffer(), buyer.toBuffer()], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getFairLaunchTicket = getFairLaunchTicket;
    const getFairLaunchLotteryBitmap = async (tokenMint) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('fair_launch'), tokenMint.toBuffer(), Buffer.from('lottery')], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getFairLaunchLotteryBitmap = getFairLaunchLotteryBitmap;
    const getFairLaunchTicketSeqLookup = async (tokenMint, seq) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('fair_launch'), tokenMint.toBuffer(), seq.toBuffer('le', 8)], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getFairLaunchTicketSeqLookup = getFairLaunchTicketSeqLookup;
    const getAtaForMint = async (mint, buyer) => {
        return await anchor.web3.PublicKey.findProgramAddress([buyer.toBuffer(), constants_4.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], constants_4.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
    };
    exports.getAtaForMint = getAtaForMint;
    const getParticipationMint = async (authority, uuid) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('fair_launch'),
            authority.toBuffer(),
            Buffer.from('mint'),
            Buffer.from(uuid),
            Buffer.from('participation'),
        ], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getParticipationMint = getParticipationMint;
    const getParticipationToken = async (authority, uuid) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('fair_launch'),
            authority.toBuffer(),
            Buffer.from('mint'),
            Buffer.from(uuid),
            Buffer.from('participation'),
            Buffer.from('account'),
        ], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getParticipationToken = getParticipationToken;
    const getTreasury = async (tokenMint) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('fair_launch'), tokenMint.toBuffer(), Buffer.from('treasury')], constants_4.FAIR_LAUNCH_PROGRAM_ID);
    };
    exports.getTreasury = getTreasury;
    const getMetadata = async (mint) => {
        return (await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            constants_4.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ], constants_4.TOKEN_METADATA_PROGRAM_ID))[0];
    };
    exports.getMetadata = getMetadata;
    const getCollectionPDA = async (candyMachineAddress) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('collection'), candyMachineAddress.toBuffer()], constants_4.CANDY_MACHINE_PROGRAM_V2_ID);
    };
    exports.getCollectionPDA = getCollectionPDA;
    const getCollectionAuthorityRecordPDA = async (mint, newAuthority) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            constants_4.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('collection_authority'),
            newAuthority.toBuffer(),
        ], constants_4.TOKEN_METADATA_PROGRAM_ID);
    };
    exports.getCollectionAuthorityRecordPDA = getCollectionAuthorityRecordPDA;
    const getMasterEdition = async (mint) => {
        return (await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            constants_4.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition'),
        ], constants_4.TOKEN_METADATA_PROGRAM_ID))[0];
    };
    exports.getMasterEdition = getMasterEdition;
    const getEditionMarkPda = async (mint, edition) => {
        const editionNumber = Math.floor(edition / 248);
        return (await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            constants_4.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition'),
            Buffer.from(editionNumber.toString()),
        ], constants_4.TOKEN_METADATA_PROGRAM_ID))[0];
    };
    exports.getEditionMarkPda = getEditionMarkPda;
    const getAuctionHouse = async (creator, treasuryMint) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from(constants_4.AUCTION_HOUSE), creator.toBuffer(), treasuryMint.toBuffer()], constants_4.AUCTION_HOUSE_PROGRAM_ID);
    };
    exports.getAuctionHouse = getAuctionHouse;
    const getAuctionHouseProgramAsSigner = async () => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from(constants_4.AUCTION_HOUSE), Buffer.from('signer')], constants_4.AUCTION_HOUSE_PROGRAM_ID);
    };
    exports.getAuctionHouseProgramAsSigner = getAuctionHouseProgramAsSigner;
    const getAuctionHouseFeeAcct = async (auctionHouse) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from(constants_4.AUCTION_HOUSE),
            auctionHouse.toBuffer(),
            Buffer.from(constants_4.FEE_PAYER),
        ], constants_4.AUCTION_HOUSE_PROGRAM_ID);
    };
    exports.getAuctionHouseFeeAcct = getAuctionHouseFeeAcct;
    const getAuctionHouseTreasuryAcct = async (auctionHouse) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from(constants_4.AUCTION_HOUSE),
            auctionHouse.toBuffer(),
            Buffer.from(constants_4.TREASURY),
        ], constants_4.AUCTION_HOUSE_PROGRAM_ID);
    };
    exports.getAuctionHouseTreasuryAcct = getAuctionHouseTreasuryAcct;
    const getAuctionHouseBuyerEscrow = async (auctionHouse, wallet) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from(constants_4.AUCTION_HOUSE), auctionHouse.toBuffer(), wallet.toBuffer()], constants_4.AUCTION_HOUSE_PROGRAM_ID);
    };
    exports.getAuctionHouseBuyerEscrow = getAuctionHouseBuyerEscrow;
    const getAuctionHouseTradeState = async (auctionHouse, wallet, tokenAccount, treasuryMint, tokenMint, tokenSize, buyPrice) => {
        return await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from(constants_4.AUCTION_HOUSE),
            wallet.toBuffer(),
            auctionHouse.toBuffer(),
            tokenAccount.toBuffer(),
            treasuryMint.toBuffer(),
            tokenMint.toBuffer(),
            buyPrice.toBuffer('le', 8),
            tokenSize.toBuffer('le', 8),
        ], constants_4.AUCTION_HOUSE_PROGRAM_ID);
    };
    exports.getAuctionHouseTradeState = getAuctionHouseTradeState;
    const getTokenEntanglement = async (mintA, mintB) => {
        return await anchor.web3.PublicKey.findProgramAddress([Buffer.from(constants_4.TOKEN_ENTANGLER), mintA.toBuffer(), mintB.toBuffer()], constants_4.TOKEN_ENTANGLEMENT_PROGRAM_ID);
    };
    exports.getTokenEntanglement = getTokenEntanglement;
    const getTokenEntanglementEscrows = async (mintA, mintB) => {
        return [
            ...(await anchor.web3.PublicKey.findProgramAddress([
                Buffer.from(constants_4.TOKEN_ENTANGLER),
                mintA.toBuffer(),
                mintB.toBuffer(),
                Buffer.from(constants_4.ESCROW),
                Buffer.from(constants_4.A),
            ], constants_4.TOKEN_ENTANGLEMENT_PROGRAM_ID)),
            ...(await anchor.web3.PublicKey.findProgramAddress([
                Buffer.from(constants_4.TOKEN_ENTANGLER),
                mintA.toBuffer(),
                mintB.toBuffer(),
                Buffer.from(constants_4.ESCROW),
                Buffer.from(constants_4.B),
            ], constants_4.TOKEN_ENTANGLEMENT_PROGRAM_ID)),
        ];
    };
    exports.getTokenEntanglementEscrows = getTokenEntanglementEscrows;
    function loadWalletKey(keypair) {
        if (!keypair || keypair == '') {
            throw new Error('Keypair is required!');
        }
        const decodedKey = new Uint8Array(keypair.endsWith('.json') && !Array.isArray(keypair)
            ? JSON.parse(fs_3.default.readFileSync(keypair).toString())
            : bytes_1.bs58.decode(keypair));
        const loaded = web3_js_4.Keypair.fromSecretKey(decodedKey);
        loglevel_2.default.info(`wallet public key: ${loaded.publicKey}`);
        return loaded;
    }
    exports.loadWalletKey = loadWalletKey;
    async function loadCandyProgram(walletKeyPair, env, customRpcUrl) {
        if (customRpcUrl)
            console.log('USING CUSTOM URL', customRpcUrl);
        // @ts-ignore
        const solConnection = new anchor.web3.Connection(
        //@ts-ignore
        customRpcUrl || (0, various_1.getCluster)(env));
        const walletWrapper = new anchor.Wallet(walletKeyPair);
        const provider = new anchor.Provider(solConnection, walletWrapper, {
            preflightCommitment: 'recent',
        });
        const idl = await anchor.Program.fetchIdl(constants_4.CANDY_MACHINE_PROGRAM_ID, provider);
        const program = new anchor.Program(idl, constants_4.CANDY_MACHINE_PROGRAM_ID, provider);
        loglevel_2.default.debug('program id from anchor', program.programId.toBase58());
        return program;
    }
    exports.loadCandyProgram = loadCandyProgram;
    async function loadCandyProgramV2(walletKeyPair, env, customRpcUrl) {
        if (customRpcUrl)
            console.log('USING CUSTOM URL', customRpcUrl);
        // @ts-ignore
        const solConnection = new anchor.web3.Connection(
        //@ts-ignore
        customRpcUrl || (0, various_1.getCluster)(env));
        const walletWrapper = new anchor.Wallet(walletKeyPair);
        const provider = new anchor.Provider(solConnection, walletWrapper, {
            preflightCommitment: 'recent',
        });
        const idl = await anchor.Program.fetchIdl(constants_4.CANDY_MACHINE_PROGRAM_V2_ID, provider);
        const program = new anchor.Program(idl, constants_4.CANDY_MACHINE_PROGRAM_V2_ID, provider);
        loglevel_2.default.debug('program id from anchor', program.programId.toBase58());
        return program;
    }
    exports.loadCandyProgramV2 = loadCandyProgramV2;
    async function loadFairLaunchProgram(walletKeyPair, env, customRpcUrl) {
        if (customRpcUrl)
            console.log('USING CUSTOM URL', customRpcUrl);
        // @ts-ignore
        const solConnection = new anchor.web3.Connection(
        //@ts-ignore
        customRpcUrl || (0, various_1.getCluster)(env));
        const walletWrapper = new anchor.Wallet(walletKeyPair);
        const provider = new anchor.Provider(solConnection, walletWrapper, {
            preflightCommitment: 'recent',
        });
        const idl = await anchor.Program.fetchIdl(constants_4.FAIR_LAUNCH_PROGRAM_ID, provider);
        return new anchor.Program(idl, constants_4.FAIR_LAUNCH_PROGRAM_ID, provider);
    }
    exports.loadFairLaunchProgram = loadFairLaunchProgram;
    async function loadAuctionHouseProgram(walletKeyPair, env, customRpcUrl) {
        if (customRpcUrl)
            console.log('USING CUSTOM URL', customRpcUrl);
        // @ts-ignore
        const solConnection = new anchor.web3.Connection(
        //@ts-ignore
        customRpcUrl || (0, various_1.getCluster)(env));
        const walletWrapper = new anchor.Wallet(walletKeyPair);
        const provider = new anchor.Provider(solConnection, walletWrapper, {
            preflightCommitment: 'recent',
        });
        const idl = await anchor.Program.fetchIdl(constants_4.AUCTION_HOUSE_PROGRAM_ID, provider);
        return new anchor.Program(idl, constants_4.AUCTION_HOUSE_PROGRAM_ID, provider);
    }
    exports.loadAuctionHouseProgram = loadAuctionHouseProgram;
    async function loadTokenEntanglementProgream(walletKeyPair, env, customRpcUrl) {
        if (customRpcUrl)
            console.log('USING CUSTOM URL', customRpcUrl);
        // @ts-ignore
        const solConnection = new anchor.web3.Connection(
        //@ts-ignore
        customRpcUrl || (0, various_1.getCluster)(env));
        const walletWrapper = new anchor.Wallet(walletKeyPair);
        const provider = new anchor.Provider(solConnection, walletWrapper, {
            preflightCommitment: 'recent',
        });
        const idl = await anchor.Program.fetchIdl(constants_4.TOKEN_ENTANGLEMENT_PROGRAM_ID, provider);
        return new anchor.Program(idl, constants_4.TOKEN_ENTANGLEMENT_PROGRAM_ID, provider);
    }
    exports.loadTokenEntanglementProgream = loadTokenEntanglementProgream;
    async function getTokenAmount(anchorProgram, account, mint) {
        let amount = 0;
        if (!mint.equals(constants_4.WRAPPED_SOL_MINT)) {
            try {
                const token = await anchorProgram.provider.connection.getTokenAccountBalance(account);
                amount = token.value.uiAmount * Math.pow(10, token.value.decimals);
            }
            catch (e) {
                loglevel_2.default.error(e);
                loglevel_2.default.info('Account ', account.toBase58(), 'didnt return value. Assuming 0 tokens.');
            }
        }
        else {
            amount = await anchorProgram.provider.connection.getBalance(account);
        }
        return amount;
    }
    exports.getTokenAmount = getTokenAmount;
    const getBalance = async (account, env, customRpcUrl) => {
        if (customRpcUrl)
            console.log('USING CUSTOM URL', customRpcUrl);
        const connection = new anchor.web3.Connection(
        //@ts-ignore
        customRpcUrl || (0, various_1.getCluster)(env));
        return await connection.getBalance(account);
    };
    exports.getBalance = getBalance;
    async function getProgramAccounts(connection, programId, configOrCommitment) {
        const extra = {};
        let commitment;
        //let encoding;
        if (configOrCommitment) {
            if (typeof configOrCommitment === 'string') {
                commitment = configOrCommitment;
            }
            else {
                commitment = configOrCommitment.commitment;
                //encoding = configOrCommitment.encoding;
                if (configOrCommitment.dataSlice) {
                    extra.dataSlice = configOrCommitment.dataSlice;
                }
                if (configOrCommitment.filters) {
                    extra.filters = configOrCommitment.filters;
                }
            }
        }
        const args = connection._buildArgs([programId], commitment, 'base64', extra);
        const unsafeRes = await connection._rpcRequest('getProgramAccounts', args);
        return unsafeResAccounts(unsafeRes.result);
    }
    exports.getProgramAccounts = getProgramAccounts;
    function unsafeAccount(account) {
        return {
            // TODO: possible delay parsing could be added here
            data: Buffer.from(account.data[0], 'base64'),
            executable: account.executable,
            lamports: account.lamports,
            // TODO: maybe we can do it in lazy way? or just use string
            owner: account.owner,
        };
    }
    function unsafeResAccounts(data) {
        return data.map(item => ({
            account: unsafeAccount(item.account),
            pubkey: item.pubkey,
        }));
    }
});
define("helpers/transactions", ["require", "exports", "@solana/web3.js", "helpers/various", "helpers/constants", "loglevel"], function (require, exports, web3_js_5, various_2, constants_5, loglevel_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sendSignedTransaction = exports.sendTransactionWithRetryWithKeypair = void 0;
    loglevel_3 = __importDefault(loglevel_3);
    const sendTransactionWithRetryWithKeypair = async (connection, wallet, instructions, signers, commitment = 'singleGossip', includesFeePayer = false, block, beforeSend) => {
        const transaction = new web3_js_5.Transaction();
        instructions.forEach(instruction => transaction.add(instruction));
        transaction.recentBlockhash = (block || (await connection.getRecentBlockhash(commitment))).blockhash;
        if (includesFeePayer) {
            transaction.setSigners(...signers.map(s => s.publicKey));
        }
        else {
            transaction.setSigners(
            // fee payed by the wallet owner
            wallet.publicKey, ...signers.map(s => s.publicKey));
        }
        if (signers.length > 0) {
            transaction.sign(...[wallet, ...signers]);
        }
        else {
            transaction.sign(wallet);
        }
        if (beforeSend) {
            beforeSend();
        }
        const { txid, slot } = await sendSignedTransaction({
            connection,
            signedTransaction: transaction,
        });
        return { txid, slot };
    };
    exports.sendTransactionWithRetryWithKeypair = sendTransactionWithRetryWithKeypair;
    async function sendSignedTransaction({ signedTransaction, connection, timeout = constants_5.DEFAULT_TIMEOUT, }) {
        const rawTransaction = signedTransaction.serialize();
        const startTime = (0, various_2.getUnixTs)();
        let slot = 0;
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
        });
        loglevel_3.default.debug('Started awaiting confirmation for', txid);
        let done = false;
        (async () => {
            while (!done && (0, various_2.getUnixTs)() - startTime < timeout) {
                connection.sendRawTransaction(rawTransaction, {
                    skipPreflight: true,
                });
                await (0, various_2.sleep)(500);
            }
        })();
        try {
            const confirmation = await awaitTransactionSignatureConfirmation(txid, timeout, connection, 'confirmed', true);
            if (!confirmation)
                throw new Error('Timed out awaiting confirmation on transaction');
            if (confirmation.err) {
                loglevel_3.default.error(confirmation.err);
                throw new Error('Transaction failed: Custom instruction error');
            }
            slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
        }
        catch (err) {
            loglevel_3.default.error('Timeout Error caught', err);
            if (err.timeout) {
                throw new Error('Timed out awaiting confirmation on transaction');
            }
            let simulateResult = null;
            try {
                simulateResult = (await simulateTransaction(connection, signedTransaction, 'single')).value;
            }
            catch (e) {
                loglevel_3.default.error('Simulate Transaction error', e);
            }
            if (simulateResult && simulateResult.err) {
                if (simulateResult.logs) {
                    for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
                        const line = simulateResult.logs[i];
                        if (line.startsWith('Program log: ')) {
                            throw new Error('Transaction failed: ' + line.slice('Program log: '.length));
                        }
                    }
                }
                throw new Error(JSON.stringify(simulateResult.err));
            }
            loglevel_3.default.error('Got this far.');
            // throw new Error('Transaction failed');
        }
        finally {
            done = true;
        }
        loglevel_3.default.debug('Latency (ms)', txid, (0, various_2.getUnixTs)() - startTime);
        return { txid, slot };
    }
    exports.sendSignedTransaction = sendSignedTransaction;
    async function simulateTransaction(connection, transaction, commitment) {
        // @ts-ignore
        transaction.recentBlockhash = await connection._recentBlockhash(
        // @ts-ignore
        connection._disableBlockhashCaching);
        const signData = transaction.serializeMessage();
        // @ts-ignore
        const wireTransaction = transaction._serialize(signData);
        const encodedTransaction = wireTransaction.toString('base64');
        const config = { encoding: 'base64', commitment };
        const args = [encodedTransaction, config];
        // @ts-ignore
        const res = await connection._rpcRequest('simulateTransaction', args);
        if (res.error) {
            throw new Error('failed to simulate transaction: ' + res.error.message);
        }
        return res.result;
    }
    async function awaitTransactionSignatureConfirmation(txid, timeout, connection, commitment = 'recent', queryStatus = false) {
        let done = false;
        let status = {
            slot: 0,
            confirmations: 0,
            err: null,
        };
        let subId = 0;
        // eslint-disable-next-line no-async-promise-executor
        status = await new Promise(async (resolve, reject) => {
            setTimeout(() => {
                if (done) {
                    return;
                }
                done = true;
                loglevel_3.default.warn('Rejecting for timeout...');
                reject({ timeout: true });
            }, timeout);
            try {
                subId = connection.onSignature(txid, (result, context) => {
                    done = true;
                    status = {
                        err: result.err,
                        slot: context.slot,
                        confirmations: 0,
                    };
                    if (result.err) {
                        loglevel_3.default.warn('Rejected via websocket', result.err);
                        reject(status);
                    }
                    else {
                        loglevel_3.default.debug('Resolved via websocket', result);
                        resolve(status);
                    }
                }, commitment);
            }
            catch (e) {
                done = true;
                loglevel_3.default.error('WS error in setup', txid, e);
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
                                loglevel_3.default.debug('REST null result for', txid, status);
                            }
                            else if (status.err) {
                                loglevel_3.default.error('REST error for', txid, status);
                                done = true;
                                reject(status.err);
                            }
                            else if (!status.confirmations) {
                                loglevel_3.default.debug('REST no confirmations for', txid, status);
                            }
                            else {
                                loglevel_3.default.debug('REST confirmation for', txid, status);
                                done = true;
                                resolve(status);
                            }
                        }
                    }
                    catch (e) {
                        if (!done) {
                            loglevel_3.default.error('REST connection error: txid', txid, e);
                        }
                    }
                })();
                await (0, various_2.sleep)(2000);
            }
        });
        //@ts-ignore
        if (connection._signatureSubscriptions[subId])
            connection.removeSignatureListener(subId);
        done = true;
        loglevel_3.default.debug('Returning status', status);
        return status;
    }
});
define("commands/mint", ["require", "exports", "@solana/web3.js", "helpers/accounts", "helpers/constants", "@project-serum/anchor", "@solana/spl-token", "helpers/instructions", "helpers/transactions", "loglevel"], function (require, exports, web3_js_6, accounts_2, constants_6, anchor, spl_token_3, instructions_2, transactions_1, loglevel_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mintV2 = exports.mint = void 0;
    anchor = __importStar(anchor);
    loglevel_4 = __importDefault(loglevel_4);
    async function mint(keypair, env, configAddress, uuid, rpcUrl) {
        const mint = web3_js_6.Keypair.generate();
        const userKeyPair = (0, accounts_2.loadWalletKey)(keypair);
        const anchorProgram = await (0, accounts_2.loadCandyProgram)(userKeyPair, env, rpcUrl);
        const userTokenAccountAddress = await (0, accounts_2.getTokenWallet)(userKeyPair.publicKey, mint.publicKey);
        const [candyMachineAddress] = await (0, accounts_2.getCandyMachineAddress)(configAddress, uuid);
        const candyMachine = await anchorProgram.account.candyMachine.fetch(candyMachineAddress);
        const remainingAccounts = [];
        const signers = [mint, userKeyPair];
        const instructions = [
            anchor.web3.SystemProgram.createAccount({
                fromPubkey: userKeyPair.publicKey,
                newAccountPubkey: mint.publicKey,
                space: spl_token_3.MintLayout.span,
                lamports: await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_3.MintLayout.span),
                programId: constants_6.TOKEN_PROGRAM_ID,
            }),
            spl_token_3.Token.createInitMintInstruction(constants_6.TOKEN_PROGRAM_ID, mint.publicKey, 0, userKeyPair.publicKey, userKeyPair.publicKey),
            (0, instructions_2.createAssociatedTokenAccountInstruction)(userTokenAccountAddress, userKeyPair.publicKey, userKeyPair.publicKey, mint.publicKey),
            spl_token_3.Token.createMintToInstruction(constants_6.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, userKeyPair.publicKey, [], 1),
        ];
        let tokenAccount;
        if (candyMachine.tokenMint) {
            const transferAuthority = anchor.web3.Keypair.generate();
            tokenAccount = await (0, accounts_2.getTokenWallet)(userKeyPair.publicKey, candyMachine.tokenMint);
            remainingAccounts.push({
                pubkey: tokenAccount,
                isWritable: true,
                isSigner: false,
            });
            remainingAccounts.push({
                pubkey: userKeyPair.publicKey,
                isWritable: false,
                isSigner: true,
            });
            instructions.push(spl_token_3.Token.createApproveInstruction(constants_6.TOKEN_PROGRAM_ID, tokenAccount, transferAuthority.publicKey, userKeyPair.publicKey, [], candyMachine.data.price.toNumber()));
        }
        const metadataAddress = await (0, accounts_2.getMetadata)(mint.publicKey);
        const masterEdition = await (0, accounts_2.getMasterEdition)(mint.publicKey);
        instructions.push(await anchorProgram.instruction.mintNft({
            accounts: {
                config: configAddress,
                candyMachine: candyMachineAddress,
                payer: userKeyPair.publicKey,
                //@ts-ignore
                wallet: candyMachine.wallet,
                mint: mint.publicKey,
                metadata: metadataAddress,
                masterEdition,
                mintAuthority: userKeyPair.publicKey,
                updateAuthority: userKeyPair.publicKey,
                tokenMetadataProgram: constants_6.TOKEN_METADATA_PROGRAM_ID,
                tokenProgram: constants_6.TOKEN_PROGRAM_ID,
                systemProgram: web3_js_6.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
            },
            remainingAccounts,
        }));
        if (tokenAccount) {
            instructions.push(spl_token_3.Token.createRevokeInstruction(constants_6.TOKEN_PROGRAM_ID, tokenAccount, userKeyPair.publicKey, []));
        }
        return (await (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, instructions, signers)).txid;
    }
    exports.mint = mint;
    async function mintV2(keypair, env, candyMachineAddress, rpcUrl) {
        var _a, _b, _c;
        const mint = web3_js_6.Keypair.generate();
        const userKeyPair = (0, accounts_2.loadWalletKey)(keypair);
        const anchorProgram = await (0, accounts_2.loadCandyProgramV2)(userKeyPair, env, rpcUrl);
        const userTokenAccountAddress = await (0, accounts_2.getTokenWallet)(userKeyPair.publicKey, mint.publicKey);
        const candyMachine = await anchorProgram.account.candyMachine.fetch(candyMachineAddress);
        const remainingAccounts = [];
        const signers = [mint, userKeyPair];
        const cleanupInstructions = [];
        const instructions = [
            anchor.web3.SystemProgram.createAccount({
                fromPubkey: userKeyPair.publicKey,
                newAccountPubkey: mint.publicKey,
                space: spl_token_3.MintLayout.span,
                lamports: await anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_3.MintLayout.span),
                programId: constants_6.TOKEN_PROGRAM_ID,
            }),
            spl_token_3.Token.createInitMintInstruction(constants_6.TOKEN_PROGRAM_ID, mint.publicKey, 0, userKeyPair.publicKey, userKeyPair.publicKey),
            (0, instructions_2.createAssociatedTokenAccountInstruction)(userTokenAccountAddress, userKeyPair.publicKey, userKeyPair.publicKey, mint.publicKey),
            spl_token_3.Token.createMintToInstruction(constants_6.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, userKeyPair.publicKey, [], 1),
        ];
        if (candyMachine.data.whitelistMintSettings) {
            const mint = new anchor.web3.PublicKey(candyMachine.data.whitelistMintSettings.mint);
            const whitelistToken = (await (0, accounts_2.getAtaForMint)(mint, userKeyPair.publicKey))[0];
            remainingAccounts.push({
                pubkey: whitelistToken,
                isWritable: true,
                isSigner: false,
            });
            if (candyMachine.data.whitelistMintSettings.mode.burnEveryTime) {
                const whitelistBurnAuthority = anchor.web3.Keypair.generate();
                remainingAccounts.push({
                    pubkey: mint,
                    isWritable: true,
                    isSigner: false,
                });
                remainingAccounts.push({
                    pubkey: whitelistBurnAuthority.publicKey,
                    isWritable: false,
                    isSigner: true,
                });
                signers.push(whitelistBurnAuthority);
                const exists = await anchorProgram.provider.connection.getAccountInfo(whitelistToken);
                if (exists) {
                    instructions.push(spl_token_3.Token.createApproveInstruction(constants_6.TOKEN_PROGRAM_ID, whitelistToken, whitelistBurnAuthority.publicKey, userKeyPair.publicKey, [], 1));
                    cleanupInstructions.push(spl_token_3.Token.createRevokeInstruction(constants_6.TOKEN_PROGRAM_ID, whitelistToken, userKeyPair.publicKey, []));
                }
            }
        }
        let tokenAccount;
        if (candyMachine.tokenMint) {
            const transferAuthority = anchor.web3.Keypair.generate();
            tokenAccount = await (0, accounts_2.getTokenWallet)(userKeyPair.publicKey, candyMachine.tokenMint);
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
            instructions.push(spl_token_3.Token.createApproveInstruction(constants_6.TOKEN_PROGRAM_ID, tokenAccount, transferAuthority.publicKey, userKeyPair.publicKey, [], candyMachine.data.price.toNumber()));
            signers.push(transferAuthority);
            cleanupInstructions.push(spl_token_3.Token.createRevokeInstruction(constants_6.TOKEN_PROGRAM_ID, tokenAccount, userKeyPair.publicKey, []));
        }
        const metadataAddress = await (0, accounts_2.getMetadata)(mint.publicKey);
        const masterEdition = await (0, accounts_2.getMasterEdition)(mint.publicKey);
        loglevel_4.default.debug('Remaining accounts: ', remainingAccounts.map(i => i.pubkey.toBase58()));
        const [candyMachineCreator, creatorBump] = await (0, accounts_2.getCandyMachineCreator)(candyMachineAddress);
        instructions.push(await anchorProgram.instruction.mintNft(creatorBump, {
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
                tokenMetadataProgram: constants_6.TOKEN_METADATA_PROGRAM_ID,
                tokenProgram: constants_6.TOKEN_PROGRAM_ID,
                systemProgram: web3_js_6.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                recentBlockhashes: anchor.web3.SYSVAR_SLOT_HASHES_PUBKEY,
                instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
        }));
        const collectionPDA = (await (0, accounts_2.getCollectionPDA)(candyMachineAddress))[0];
        const collectionPDAAccount = await anchorProgram.provider.connection.getAccountInfo(collectionPDA);
        if (collectionPDAAccount && candyMachine.data.retainAuthority) {
            try {
                const collectionPdaData = (await anchorProgram.account.collectionPda.fetch(collectionPDA));
                const collectionMint = collectionPdaData.mint;
                const collectionAuthorityRecord = (await (0, accounts_2.getCollectionAuthorityRecordPDA)(collectionMint, collectionPDA))[0];
                if (collectionMint) {
                    const collectionMetadata = await (0, accounts_2.getMetadata)(collectionMint);
                    const collectionMasterEdition = await (0, accounts_2.getMasterEdition)(collectionMint);
                    loglevel_4.default.debug('Collection PDA: ', collectionPDA.toBase58());
                    loglevel_4.default.debug('Authority: ', candyMachine.authority.toBase58());
                    instructions.push(await anchorProgram.instruction.setCollectionDuringMint({
                        accounts: {
                            candyMachine: candyMachineAddress,
                            metadata: metadataAddress,
                            payer: userKeyPair.publicKey,
                            collectionPda: collectionPDA,
                            tokenMetadataProgram: constants_6.TOKEN_METADATA_PROGRAM_ID,
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
        loglevel_4.default.info('Transaction size estimate: ', txnEstimate);
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
});
define("candy-machine-v2-cli", ["require", "exports", "fs", "commander", "@solana/web3.js", "helpers/constants", "helpers/cache", "commands/mint", "loglevel"], function (require, exports, fs, commander_1, web3_js_7, constants_7, cache_1, mint_1, loglevel_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fs = __importStar(fs);
    loglevel_5 = __importDefault(loglevel_5);
    commander_1.program.version('0.0.2');
    if (!fs.existsSync(constants_7.CACHE_PATH)) {
        fs.mkdirSync(constants_7.CACHE_PATH);
    }
    loglevel_5.default.setLevel(loglevel_5.default.levels.INFO);
    programCommand('mint_one_token')
        .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
        .action(async (directory, cmd) => {
        const { keypair, env, cacheName, rpcUrl } = cmd.opts();
        const cacheContent = (0, cache_1.loadCache)(cacheName, env);
        const candyMachine = new web3_js_7.PublicKey(cacheContent.program.candyMachine);
        const tx = await (0, mint_1.mintV2)(keypair, env, candyMachine, rpcUrl);
        loglevel_5.default.info('mint_one_token finished', tx);
    });
    programCommand('mint_multiple_tokens')
        .requiredOption('-n, --number <string>', 'Number of tokens')
        .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
        .action(async (_, cmd) => {
        const { keypair, env, cacheName, number, rpcUrl } = cmd.opts();
        const NUMBER_OF_NFTS_TO_MINT = parseInt(number, 10);
        const cacheContent = (0, cache_1.loadCache)(cacheName, env);
        const candyMachine = new web3_js_7.PublicKey(cacheContent.program.candyMachine);
        loglevel_5.default.info(`Minting ${NUMBER_OF_NFTS_TO_MINT} tokens...`);
        const mintToken = async (index) => {
            const tx = await (0, mint_1.mintV2)(keypair, env, candyMachine, rpcUrl);
            loglevel_5.default.info(`transaction ${index + 1} complete`, tx);
            if (index < NUMBER_OF_NFTS_TO_MINT - 1) {
                loglevel_5.default.info('minting another token...');
                await mintToken(index + 1);
            }
        };
        await mintToken(0);
        loglevel_5.default.info(`minted ${NUMBER_OF_NFTS_TO_MINT} tokens`);
        loglevel_5.default.info('mint_multiple_tokens finished');
    });
    function programCommand(name, options = { requireWallet: true }) {
        let cmProgram = commander_1.program
            .command(name)
            .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
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
        loglevel_5.default.info('setting the log value to: ' + value);
        loglevel_5.default.setLevel(value);
    }
    commander_1.program.parse(process.argv);
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METADATA_SCHEMA = exports.Metadata = exports.Data = exports.Edition = exports.EditionMarker = exports.MasterEditionV2 = exports.MasterEditionV1 = exports.MetadataKey = exports.ConfigData = exports.Creator = void 0;
    class Creator {
        constructor(args) {
            this.address = args.address;
            this.verified = args.verified;
            this.share = args.share;
        }
    }
    exports.Creator = Creator;
    class ConfigData {
        constructor(args) {
            this.name = args.name;
            this.symbol = args.symbol;
            this.uri = args.uri;
            this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
            this.creators = args.creators;
            this.maxNumberOfLines = args.maxNumberOfLines;
            this.isMutable = args.isMutable;
            this.maxSupply = args.maxSupply;
            this.retainAuthority = args.retainAuthority;
        }
    }
    exports.ConfigData = ConfigData;
    var MetadataKey;
    (function (MetadataKey) {
        MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
        MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
        MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
        MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
        MetadataKey[MetadataKey["MasterEditionV2"] = 6] = "MasterEditionV2";
        MetadataKey[MetadataKey["EditionMarker"] = 7] = "EditionMarker";
    })(MetadataKey = exports.MetadataKey || (exports.MetadataKey = {}));
    class MasterEditionV1 {
        constructor(args) {
            this.key = MetadataKey.MasterEditionV1;
            this.supply = args.supply;
            this.maxSupply = args.maxSupply;
            this.printingMint = args.printingMint;
            this.oneTimePrintingAuthorizationMint =
                args.oneTimePrintingAuthorizationMint;
        }
    }
    exports.MasterEditionV1 = MasterEditionV1;
    class MasterEditionV2 {
        constructor(args) {
            this.key = MetadataKey.MasterEditionV2;
            this.supply = args.supply;
            this.maxSupply = args.maxSupply;
        }
    }
    exports.MasterEditionV2 = MasterEditionV2;
    class EditionMarker {
        constructor(args) {
            this.key = MetadataKey.EditionMarker;
            this.ledger = args.ledger;
        }
    }
    exports.EditionMarker = EditionMarker;
    class Edition {
        constructor(args) {
            this.key = MetadataKey.EditionV1;
            this.parent = args.parent;
            this.edition = args.edition;
        }
    }
    exports.Edition = Edition;
    class Data {
        constructor(args) {
            this.name = args.name;
            this.symbol = args.symbol;
            this.uri = args.uri;
            this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
            this.creators = args.creators;
        }
    }
    exports.Data = Data;
    class Metadata {
        constructor(args) {
            this.key = MetadataKey.MetadataV1;
            this.updateAuthority = args.updateAuthority;
            this.mint = args.mint;
            this.data = args.data;
            this.primarySaleHappened = args.primarySaleHappened;
            this.isMutable = args.isMutable;
        }
    }
    exports.Metadata = Metadata;
    exports.METADATA_SCHEMA = new Map([
        [
            MasterEditionV1,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['supply', 'u64'],
                    ['maxSupply', { kind: 'option', type: 'u64' }],
                    ['printingMint', 'pubkey'],
                    ['oneTimePrintingAuthorizationMint', [32]],
                ],
            },
        ],
        [
            MasterEditionV2,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['supply', 'u64'],
                    ['maxSupply', { kind: 'option', type: 'u64' }],
                ],
            },
        ],
        [
            Edition,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['parent', [32]],
                    ['edition', 'u64'],
                ],
            },
        ],
        [
            Data,
            {
                kind: 'struct',
                fields: [
                    ['name', 'string'],
                    ['symbol', 'string'],
                    ['uri', 'string'],
                    ['sellerFeeBasisPoints', 'u16'],
                    ['creators', { kind: 'option', type: [Creator] }],
                ],
            },
        ],
        [
            Creator,
            {
                kind: 'struct',
                fields: [
                    ['address', [32]],
                    ['verified', 'u8'],
                    ['share', 'u8'],
                ],
            },
        ],
        [
            Metadata,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['updateAuthority', [32]],
                    ['mint', [32]],
                    ['data', Data],
                    ['primarySaleHappened', 'u8'],
                    ['isMutable', 'u8'],
                ],
            },
        ],
        [
            EditionMarker,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['ledger', [31]],
                ],
            },
        ],
    ]);
});
define("helpers/schema", ["require", "exports", "borsh", "bs58", "@solana/web3.js"], function (require, exports, borsh_1, bs58_1, web3_js_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendBorsh = exports.decodeMetadata = exports.METADATA_SCHEMA = exports.Metadata = exports.CreateMasterEditionArgs = exports.UpdateMetadataArgs = exports.CreateMetadataArgs = exports.Data = exports.Creator = exports.MetadataKey = void 0;
    bs58_1 = __importDefault(bs58_1);
    var MetadataKey;
    (function (MetadataKey) {
        MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
        MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
        MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
        MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
        MetadataKey[MetadataKey["MasterEditionV2"] = 6] = "MasterEditionV2";
        MetadataKey[MetadataKey["EditionMarker"] = 7] = "EditionMarker";
    })(MetadataKey = exports.MetadataKey || (exports.MetadataKey = {}));
    class Creator {
        constructor(args) {
            this.address = args.address;
            this.verified = args.verified;
            this.share = args.share;
        }
    }
    exports.Creator = Creator;
    class Data {
        constructor(args) {
            this.name = args.name;
            this.symbol = args.symbol;
            this.uri = args.uri;
            this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
            this.creators = args.creators;
        }
    }
    exports.Data = Data;
    class CreateMetadataArgs {
        constructor(args) {
            this.instruction = 0;
            this.data = args.data;
            this.isMutable = args.isMutable;
        }
    }
    exports.CreateMetadataArgs = CreateMetadataArgs;
    class UpdateMetadataArgs {
        constructor(args) {
            this.instruction = 1;
            this.data = args.data ? args.data : null;
            this.updateAuthority = args.updateAuthority ? args.updateAuthority : null;
            this.primarySaleHappened = args.primarySaleHappened;
        }
    }
    exports.UpdateMetadataArgs = UpdateMetadataArgs;
    class CreateMasterEditionArgs {
        constructor(args) {
            this.instruction = 10;
            this.maxSupply = args.maxSupply;
        }
    }
    exports.CreateMasterEditionArgs = CreateMasterEditionArgs;
    class Metadata {
        constructor(args) {
            var _a;
            this.key = MetadataKey.MetadataV1;
            this.updateAuthority = args.updateAuthority;
            this.mint = args.mint;
            this.data = args.data;
            this.primarySaleHappened = args.primarySaleHappened;
            this.isMutable = args.isMutable;
            this.editionNonce = (_a = args.editionNonce) !== null && _a !== void 0 ? _a : null;
        }
    }
    exports.Metadata = Metadata;
    exports.METADATA_SCHEMA = new Map([
        [
            CreateMetadataArgs,
            {
                kind: 'struct',
                fields: [
                    ['instruction', 'u8'],
                    ['data', Data],
                    ['isMutable', 'u8'], // bool
                ],
            },
        ],
        [
            CreateMasterEditionArgs,
            {
                kind: 'struct',
                fields: [
                    ['instruction', 'u8'],
                    ['maxSupply', { kind: 'option', type: 'u64' }],
                ],
            },
        ],
        [
            UpdateMetadataArgs,
            {
                kind: 'struct',
                fields: [
                    ['instruction', 'u8'],
                    ['data', { kind: 'option', type: Data }],
                    ['updateAuthority', { kind: 'option', type: 'pubkeyAsString' }],
                    ['primarySaleHappened', { kind: 'option', type: 'u8' }],
                ],
            },
        ],
        [
            Data,
            {
                kind: 'struct',
                fields: [
                    ['name', 'string'],
                    ['symbol', 'string'],
                    ['uri', 'string'],
                    ['sellerFeeBasisPoints', 'u16'],
                    ['creators', { kind: 'option', type: [Creator] }],
                ],
            },
        ],
        [
            Creator,
            {
                kind: 'struct',
                fields: [
                    ['address', 'pubkeyAsString'],
                    ['verified', 'u8'],
                    ['share', 'u8'],
                ],
            },
        ],
        [
            Metadata,
            {
                kind: 'struct',
                fields: [
                    ['key', 'u8'],
                    ['updateAuthority', 'pubkeyAsString'],
                    ['mint', 'pubkeyAsString'],
                    ['data', Data],
                    ['primarySaleHappened', 'u8'],
                    ['isMutable', 'u8'],
                    ['editionNonce', { kind: 'option', type: 'u8' }],
                ],
            },
        ],
    ]);
    // eslint-disable-next-line no-control-regex
    const METADATA_REPLACE = new RegExp('\u0000', 'g');
    const decodeMetadata = (buffer) => {
        const metadata = (0, borsh_1.deserializeUnchecked)(exports.METADATA_SCHEMA, Metadata, buffer);
        metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
        metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
        metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
        return metadata;
    };
    exports.decodeMetadata = decodeMetadata;
    const extendBorsh = () => {
        borsh_1.BinaryReader.prototype.readPubkey = function () {
            const reader = this;
            const array = reader.readFixedArray(32);
            return new web3_js_8.PublicKey(array);
        };
        borsh_1.BinaryWriter.prototype.writePubkey = function (value) {
            const writer = this;
            writer.writeFixedArray(value.toBuffer());
        };
        borsh_1.BinaryReader.prototype.readPubkeyAsString = function () {
            const reader = this;
            const array = reader.readFixedArray(32);
            return bs58_1.default.encode(array);
        };
        borsh_1.BinaryWriter.prototype.writePubkeyAsString = function (value) {
            const writer = this;
            writer.writeFixedArray(bs58_1.default.decode(value));
        };
    };
    exports.extendBorsh = extendBorsh;
    (0, exports.extendBorsh)();
});
