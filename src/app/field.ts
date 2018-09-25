import { Node, NodeType } from './node';

export class Field extends Node {

  // fields do not have children
  constructor(name: string) {
    super(name, NodeType.Field, null);
  }
}
