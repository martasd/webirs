import { Node, NodeDirection, NodeType } from './node';

export class Field extends Node {

  // fields do not have children
  constructor(name: string, direction: NodeDirection) {
    super(name, NodeType.Field, direction, null);
  }
}
