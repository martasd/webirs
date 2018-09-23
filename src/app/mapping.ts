import { Condition } from './condition';
import { Node } from './node';

export class Mapping {

  constructor(
    public sourceNode: Node,
    public targetNode: Node,
    public condition: Condition
  ) {}
}
