import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../link';
import { Node } from '../node';

@Component({
  selector: '[app-tree]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class TreeComponent implements OnInit {

  @Input() tree: Node[];

  constructor() { }

  ngOnInit() {
  }

}
