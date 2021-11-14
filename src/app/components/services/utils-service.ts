import { Injectable } from "@angular/core";
import { AlchemyProvider } from '@ethersproject/providers';
import { environment } from "src/environments/environment";

@Injectable()
export class UtilsService {

    provider: AlchemyProvider;

    constructor() {
        this.provider = new AlchemyProvider(environment.ethNetwork, environment.alchemyApiKey);
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

}