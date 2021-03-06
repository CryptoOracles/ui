import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
//import { ImLogger, WinstonLogger } from '@imtbl/imlogging';
import { ImmutableXClient, MintableERC721TokenType } from '@imtbl/imx-sdk';

import { environment } from 'src/environments/environment';
//import { loggerConfig } from './config/logging';

// Create Auth Signature
import * as encUtils from 'enc-utils';

// TODO: Check Moralis
const provider = new AlchemyProvider('ropsten', environment.alchemyApiKey);
//const log: ImLogger = new WinstonLogger(loggerConfig);
const component = 'imx-bulk-mint-script';

(async (): Promise<void> => {
    const mintToWallet = '0x....'; // eth wallet public address which will receive the token
    const signer = new Wallet(process.env.PRIVATE_KEY!).connect(provider);

    const minter = await ImmutableXClient.build({
      publicApiUrl: process.env.PUBLIC_API_URL, // https://api.ropsten.x.immutable.com/v1 for ropsten, https://api.x.immutable.com/v1 for mainnet
      signer: signer,
      starkContractAddress: process.env.STARK_CONTRACT_ADDRESS, // 0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef for ropsten, 0x5FDCCA53617f4d2b9134B29090C87D01058e27e9 for mainnet
      registrationContractAddress: process.env.REGISTRATION_CONTRACT_ADDRESS, // 0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864 for ropsten, 0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c for mainnet
      gasLimit: process.env.GAS_LIMIT,
      gasPrice: process.env.GAS_PRICE,
    });

    //log.info(component, 'MINTER REGISTRATION');
    const registerImxResult = await minter.registerImx({
      etherKey: minter.address.toLowerCase(),
      starkPublicKey: minter.starkPublicKey,
    });

    if (registerImxResult.tx_hash === '') {
      //log.info(component, 'Minter registered, continuing...');
    } else {
      //log.info(component, 'Waiting for minter registration...');
      await waitForTransaction(Promise.resolve(registerImxResult.tx_hash));
    }

    const result = await minter.mint({
      mints: [
        {
          etherKey: mintToWallet.toLowerCase(),
          tokens: [{
            type: MintableERC721TokenType.MINTABLE_ERC721,
            data: {
                tokenAddress: environment.tokenAddress, // address of token
                id: '123', // must be a unique uint256 as a string
                blueprint: 'metadata', // metadata can be anything but your L1 contract must parse it on withdrawal from the blueprint format '{tokenId}:{metadata}'
            },
          }],
          nonce: '1',
          authSignature: '', // Leave empty
        },
      ],
    });
    console.log(result);
})().catch((e) => {
    //log.error(component, e);
    process.exit(1);
});

// Create Auth Signature

// const hash = keccak256(toUtf8Bytes(JSON.stringify(mintBodyPayload)));
// const sig = deserializeSignature(await this.signer.signMessage(hash));
// return encUtils.addHexPrefix(
//   encUtils.padLeft(sig.r.toString(16), 64) +
//   encUtils.padLeft(sig.s.toString(16), 64) +
//   encUtils.padLeft(sig.recoveryParam?.toString(16) || '', 2),
// );
