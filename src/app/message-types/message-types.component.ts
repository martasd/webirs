import { Component, OnInit } from '@angular/core';
import { MessageType } from '../message-type';
import { Repo } from '../repo';

@Component({
  selector: 'app-message-types',
  templateUrl: './message-types.component.html',
  styleUrls: ['./message-types.component.css']
})
export class MessageTypesComponent implements OnInit {

  mtList = [ new MessageType('mt103', null, null, null)];

  repos = [
    new Repo('gateIn', this.mtList),
    new Repo('finAnalysis', this.mtList),
    new Repo('gateOut', this.mtList),
  ];

  constructor() { }

  ngOnInit() {
  }

}
