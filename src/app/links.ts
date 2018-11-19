import { Node } from './node';
import { Link } from './link';
import { LeaderLine } from 'leader-line';

export class Links {

  // Map of links
  public map: Map<Node, Link>;
  // Map of lines: source element name -> leader line
  public lineMap: Map<string, LeaderLine>;

  constructor() {
    this.map = new Map<Node, Link>();
    this.lineMap = new Map<string, LeaderLine>();
  }
}
