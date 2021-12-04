import { environment } from "src/environments/environment";
import { AlchemyProvider } from '@ethersproject/providers';
import Web3 from "web3";
import { EventEmitter, Injectable, Output } from "@angular/core";

declare global {
    interface Window {
        ethereum:any;
    }
}

@Injectable({
    providedIn: 'root',
})
export class MetamaskUtils {
    
    @Output() onMetamaskConnect: EventEmitter<any> = new EventEmitter();
    @Output() onMetamaskDisconnect: EventEmitter<any> = new EventEmitter();

	provider: AlchemyProvider;

	constructor() {
		this.provider = new AlchemyProvider(environment.ethNetwork, environment.alchemyApiKey);
        window.ethereum.on('accountsChanged', (accounts: any) => {
            return accounts.length > 0 ? this.onMetamaskConnect.emit() :  this.onMetamaskDisconnect.emit();
        });
	}
    
	/****************/
	/*** METAMASK ***/
	/****************/

	public connectToMetamaskNatively() {
		console.log('Connecting to wallet...')
		const web3 = new Web3("http://localhost:4200")

		if(window == undefined) {
			console.log('window is undefined');
			return;
		}

		if(window.ethereum != undefined) {
			const metamaskIsInstalled = window.ethereum.isMetaMask;
			console.log('Metamask installed: ' + metamaskIsInstalled)

			// Connect metamask and get accounts array
			window.ethereum.request({
				method: "eth_requestAccounts",
			});
			
		}
	}

	public isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
    }

    public async isMetaMaskConnected() {
    const {ethereum} = window;
    const accounts = await ethereum.request({method: 'eth_accounts'});
    return accounts && accounts.length > 0;
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