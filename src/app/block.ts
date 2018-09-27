import { Node, NodeDirection, NodeType } from './node';

export class Block extends Node {

  constructor(name: string, direction: NodeDirection, children: Node[]) {
    super(name, NodeType.Block, direction, children);
  }
}
