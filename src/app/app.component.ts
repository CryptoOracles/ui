import { Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import Web3 from "web3";
import { environment } from 'src/environments/environment';
import { Link } from '@imtbl/imx-sdk';
import { UserDetails } from './model/user-details';
import { MetamaskUtils } from './components/services/metamask-utils';
import { Moralis } from 'moralis';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  link: any;
  imxClient: any;
  user: any;
  userIsConnected: boolean = false;
  metamaskIsInstalled: boolean = false;
  private metamaskObserver: Subscription;

  constructor(private metamaskUtils: MetamaskUtils, private cdRef: ChangeDetectorRef) {
    // connect app to Moralis server
    const serverUrl = "https://3nbe5ed830hf.usemoralis.com:2053/server";
    const appId = "Zjxo2wuYCz2zfHCh5jRgDI9g2PRkAbvcw6DKWMH4";
    Moralis.start({ serverUrl, appId });

    // Listen to metamask disconnection
    this.metamaskObserver = metamaskUtils.onMetamaskDisconnect.subscribe(() => {
        this.disconnectUser();
    })
  }

  ngOnInit() { //TODO clean
    Moralis.User.enableUnsafeCurrentUser();
    this.user = Moralis.User.current();
    if(this.user){
      this.userIsConnected = true;
    }
    // Check if metamask is installed
    if (this.metamaskUtils.isMetaMaskInstalled()){
      this.metamaskIsInstalled = true;
    } 
  }

  ngOnDestroy() {
    this.metamaskObserver.unsubscribe();
}

  public connectUser() {
    //this.metamaskUtils.connectToMetamaskNatively();
    this.connectToMetamaskMoralis().then((userIsConnectedSuccessfully) => {
      if(userIsConnectedSuccessfully) {
        console.log('User connected successfully')
        this.userIsConnected = true;
      } else {
        console.log('User could not be connected')
      }
    });
  }

  public async connectToMetamaskMoralis(): Promise<boolean> {
    try{
      //login user to moralis server
      if (!this.user) {
        this.user = await Moralis.authenticate({
          //provider: "web3Auth",
          //clientId: "ABBrp4odxaDvCCZJgsWefN80Nkh8X-TMyzKrwUbawsZj15BBauIvR0fudwP7fo4clhzGvDLTJjrSboRQ1B5z8Nk0",
          chainId: 0x3, 
          //appLogo: "https://gateway.pinata.cloud/ipfs/QmNXjHVmNFyw3i4u1JfdAcBntCGwxT9RD7qGifJwcJd4ot",
          //loginMethodsOrder: ["google", "facebook", "twitter", "discord", "email_passwordless"]
        });
      }
      console.log("logged in user on Moralis:", this.user);
    } catch(e) {
      console.log((e as Error).message);
      return false;
    }

    return true;
  }


  // TODO - update the page to ensure stuff change
  public disconnectUser() {
    Moralis.User.logOut().then(() => {
      this.user = Moralis.User.current();  // this will now be null
      this.userIsConnected = false;
      console.log('User disconnected successfully')
      this.cdRef.detectChanges(); 
    });
  }

  public truncate(input: string, maxLength: number): string {
    return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
  }

}