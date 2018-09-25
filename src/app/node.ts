
export enum NodeType {Block, Field, Sequence, Choice, Group}

export abstract class Node {

  constructor(
    public name: string,
    public type: NodeType,
    public children: Node[]
    ) {}
}
