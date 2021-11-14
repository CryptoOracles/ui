import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

@Component({
  selector: 'app-minting-panel',
  templateUrl: './minting-panel.component.html',
  styleUrls: ['./minting-panel.component.css']
})
export class MintingPanelComponent implements OnInit {

  imxClient: any;

  constructor() { }

  ngOnInit(): void {
    // IMX Client
    ImmutableXClient.build({ publicApiUrl: environment.imxApiAddress }).then(client => this.imxClient = client);
  }

}
