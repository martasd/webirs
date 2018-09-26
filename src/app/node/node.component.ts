import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../link';
import { Node } from '../node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node: Node;
  @Input() allLinks: Link[];

  constructor() { }

  ngOnInit() {
  }

}
