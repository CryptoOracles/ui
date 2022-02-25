import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-minting-panel',
  templateUrl: './minting-panel.component.html',
  styleUrls: ['./minting-panel.component.css']
})
export class MintingPanelComponent implements OnInit {
  
  nft_contract_address : string;

  constructor() {
    this.nft_contract_address = "0x7E5B4d9a1fcCce0060A93F2E272cC1d843dAb5Cc";
  }

  ngOnInit(): void {
  }

  public async mintToken(_address: string, _uri: string, _dna: string){
    const web3 = new Web3(window.ethereum);
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
      name: "safeMint",
      type: "function",
      inputs: [{
          type: 'address',
          name: 'to'
        },
        {
          type: 'string',
          name: 'hash_ipfs'
        },
        {
          type: 'string',
          name: 'hash_ipfs'
        }
      ]
    }, [_address, _uri, _dna]);

    const {ethereum} = window;

    const transactionParameters = {
      to: this.nft_contract_address,
      from: ethereum.selectedAddress,
      data: encodedFunction
    };
    const txt = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });
    return txt
  }
}
