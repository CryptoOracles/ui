import { Component, OnInit } from '@angular/core';
import Web3 from "web3";

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

  ngOnInit() {

  }

  public connectToWallet() {
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
        // TODO: use link.setUp();
      const accounts = window.ethereum.request({
        method: "eth_requestAccounts",
      });

    }
  }

}