import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Node, NodeDirection } from '../node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node: Node;
  direction: string;

  @ViewChild("nodeRef") nodeRef;
  @ViewChildren("childrenRef") childrenRef;

  constructor() {
  }

  ngOnInit() {
    if (this.node.direction == NodeDirection.Input) {
      this.direction = "input";
    }
    else {
      this.direction = "output";
    }
  }

  ngAfterViewInit() {
  }
}
