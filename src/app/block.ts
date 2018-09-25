import { Node, NodeType } from './node';

export class Block extends Node {

  constructor(name: string, children: Node[]) {
    super(name, NodeType.Block, children);
  }
}
