import { Node, NodeType } from 'src/app/node';
import { Mapping } from './mapping';

export class Block extends Node {

  constructor(name: string, mappings: Mapping[], nodes: Node[]) {
    super(name, NodeType.Block, mappings, nodes);
  }
}
