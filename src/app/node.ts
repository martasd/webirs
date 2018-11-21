
export enum NodeType { Block, Field, Sequence, Choice, Group }

export enum NodeDirection { Input, Output }

export class Node {

  constructor(
    public name: string,
    public type: NodeType,
    public direction: NodeDirection,
    public children: Node[]
  ) { }
}
