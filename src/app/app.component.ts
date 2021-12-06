import { Component, OnInit } from '@angular/core';
import Web3 from "web3";
import { environment } from 'src/environments/environment';
import { Link } from '@imtbl/imx-sdk';
import { UserDetails } from './model/user-details';
import { MetamaskUtils } from './components/services/metamask-utils';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  link: any;
  imxClient: any;
  user: any;
  userIsConnected: boolean = false;
  metamaskIsInstalled: boolean = false;

  constructor(private metamaskUtils: MetamaskUtils) {
    this.user = UserDetails.fromStorage();

    // Listen to metamask disconnection
    metamaskUtils.onMetamaskDisconnect.subscribe(() => {
        this.disconnectUser();
    })
  }

  ngOnInit() {
    // Link SDK
    this.link = new Link(environment.imxLinkAddress);

    // Check if metamask is installed
    if (this.metamaskUtils.isMetaMaskInstalled()){
      this.metamaskIsInstalled = true;
    } 
  }

  public connectUser() {
    this.metamaskUtils.connectToMetamaskNatively();

    this.connectToMetamaskIMX().then((userIsConnectedSuccessfully) => {
      if(userIsConnectedSuccessfully) {
        console.log('User connected successfully')
        this.userIsConnected = true;
      } else {
        console.log('User could not be connected')
      }
    });
  }

  public async connectToMetamaskIMX(): Promise<boolean> {
    try{
      const {address, starkPublicKey } = await this.link.setup({});
      this.user = new UserDetails(address, starkPublicKey);
      this.user.store();
    } catch(e) {
      console.log((e as Error).message);
      return false;
    }

    return true;
  }


  // TODO - update the page to ensure stuff change
  public disconnectUser() {
    this.user.clearStorage();
    this.user = null;
    this.userIsConnected = false;
    console.log('User disconnected successfully')
  }

  public truncate(input: string, maxLength: number): string {
    return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
  }

}