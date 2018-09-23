import { Mapping } from './mapping';

export enum NodeType {Block, Field, Sequence, Choice, Group}

export abstract class Node {

  constructor(
    public name: string,
    public type: NodeType,
    public mappings: Mapping[],
    public nodes: Node[] // children
    ) {}
}
