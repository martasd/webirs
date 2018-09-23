import { Node, NodeType } from 'src/app/node';

export class Block extends Node {

  constructor(name: string, nodes: Node[]) {
    super(name, NodeType.Block, nodes);
  }
}
