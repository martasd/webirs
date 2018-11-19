import { Node } from './node';
import { Link } from './link';

export class Links {

  // Map of links
  public map: Map<Node, Link>;
  // Map of lines: source element name -> leader line
  public lineMap: Map<string, any>;

  constructor() {
    this.map = new Map<Node, Link>();
    this.lineMap = new Map<string, any>();
  }
}