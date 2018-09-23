import { Mapping } from './mapping';
import { Node, NodeType } from './node';

export class Field extends Node {

  // fields do not have children
  constructor(name: string, mappings: Mapping[]) {
    super(name, NodeType.Field, mappings, null);
  }
}
