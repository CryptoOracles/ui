import { Component, OnInit } from '@angular/core';
import Web3 from "web3";
import { environment } from 'src/environments/environment';
import { Link } from '@imtbl/imx-sdk';
import { ImxUtilsService } from './components/services/imx-utils-service';

declare global {
  interface Window {
      ethereum:any;
  }
}

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  link: any;
  imxClient: any;
  userIsConnected: boolean = false;
  userAddress: string;
  userStarkPublicKey: string;

  constructor(private imxUtils: ImxUtilsService) {

    // Set up user as connected if we have their details:
    this.userAddress = localStorage.getItem('WALLET_ADDRESS')!;
    this.userStarkPublicKey = localStorage.getItem('STARK_PUBLIC_KEY')!;

    if(this.userAddress && this.userStarkPublicKey) {
      this.userIsConnected = true;
    }
  }

  ngOnInit() {
    // Link SDK
    this.link = new Link(environment.imxLinkAddress);
  }

  public connectUser() {
    this.connectToMetamaskIMX().then((userConnectedSuccessfully) => {
      if(userConnectedSuccessfully) {
        console.log('User connected successfully')
      } else {
        console.log('User could not be connected')
      }
    });
  }

  public async connectToMetamaskIMX(): Promise<boolean> {
    try{
      const {address, starkPublicKey } = await this.link.setup({});
    
      this.imxUtils.saveUserDetailsToStorage(address, starkPublicKey);
      this.userIsConnected = true;
      this.userAddress = address;
      this.userStarkPublicKey = starkPublicKey;

    } catch(e) {
      console.log((e as Error).message);
      return false;
    }

    return true;
  }

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

      //web3 = new Web3(window.ethereum);

      // Connect metamask and get accounts array
      
      const accounts = window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
    }
  }

  public truncate(input: string, maxLength: number): string {
    return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
  }

}