import { Injectable } from "@angular/core";
import { AlchemyProvider } from '@ethersproject/providers';
import { ImmutableXClient } from "@imtbl/imx-sdk";
import { environment } from "src/environments/environment";

@Injectable()
export class ImxUtilsService {

    provider: AlchemyProvider;
    imxClient: ImmutableXClient;
    userAddress: string;
    userStarkPublicKey: string;

    constructor() {
        this.provider = new AlchemyProvider(environment.ethNetwork, environment.alchemyApiKey);

        // IMX Client
        ImmutableXClient.build({ publicApiUrl: environment.imxApiAddress }).then(client => this.imxClient = client);
    }

    // TODO: this is not needed with Link (?) - may remove
    public async registerUser(): Promise<Boolean> {
        
        this.fetchUserDetailsFromStorage()
        if(!this.userDetailsArePresent()) {
            return false;
        }

        // Call the IMX Client SDK to register the user
        const registerImxResult = await this.imxClient.registerImx({
          etherKey: this.userAddress,
          starkPublicKey: this.userStarkPublicKey,
        });
    
        // If no tx hash is returned by the client, the user if already registered
        if (registerImxResult.tx_hash === '') {
          console.log('Minter is already registered');
        } else {
          // if not already registred, monitor the transaction on eth-scan via Alchemy
          console.log('Waiting for minter registration...');
          await this.waitForTransaction(Promise.resolve(registerImxResult.tx_hash));
        }
        
        return true;
    }

    // Helper to monitor and wait for a specific transaction to be completed on eth network.
    public waitForTransaction = async (promise: Promise<string>) => {
        const txId = await promise;
        
        console.log('Waiting for transaction', {
          txId,
          etherscanLink: environment.etherScanLink + txId,
          alchemyLink: environment.alchemyTxDashboardLink + txId,
        });

        const receipt = await this.provider.waitForTransaction(txId);
        if (receipt.status === 0) {
            console.log('The transaction was rejected');
            throw new Error('Transaction rejected');
        }

        console.log('Transaction Mined: ' + receipt.blockNumber);
        return receipt;
    };

    public saveUserDetailsToStorage(userAddress: string, userStarkPublicKey: string) {
        // Keep track of logged user info
      localStorage.setItem('WALLET_ADDRESS', userAddress);
      localStorage.setItem('STARK_PUBLIC_KEY', userStarkPublicKey);
    }

    private fetchUserDetailsFromStorage() {
        // Set up user as connected if we have their details:
        this.userAddress = localStorage.getItem('WALLET_ADDRESS')!;
        this.userStarkPublicKey = localStorage.getItem('STARK_PUBLIC_KEY')!;
    }

    private userDetailsArePresent(): boolean {
        if(this.userAddress  && this.userStarkPublicKey) {
            return true;
        } else {
            return false;
        }
    }

}