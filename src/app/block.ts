import { Mapping } from './mapping';
import { Node, NodeType } from './node';

export class Block extends Node {

  constructor(name: string, mappings: Mapping[], children: Node[]) {
    super(name, NodeType.Block, mappings, children);
  }
}
