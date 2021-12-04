import { Component, OnInit } from '@angular/core';
import Web3 from "web3";
import { environment } from 'src/environments/environment';
import { Link } from '@imtbl/imx-sdk';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  link: any;
  imxClient: any;
  user: UserDetails;
  userIsConnected: boolean = false;

  constructor() {
    this.user = UserDetails.fromStorage();
    if(!this.user.isEmtpy()) {
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
      this.userIsConnected = true;
      this.user = new UserDetails(address, starkPublicKey);
      this.user.store();
    } catch(e) {
      console.log((e as Error).message);
      return false;
    }

    return true;
  }

  public truncate(input: string, maxLength: number): string {
    return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
  }

}

    // // When an account is disconnected, reinitialise
    // window.ethereum.on('accountsChanged', async () => {
    //     localStorage.removeItem('WALLET_ADDRESS');
    //   });