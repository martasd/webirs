import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { Node } from '../node';

@Component({
  selector: '[app-nodes]',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {

  @Input() tree: Node[];

  @ViewChildren("childrenRef") children;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
