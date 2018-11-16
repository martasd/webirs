import { Node } from "./node";
import { Condition } from "./condition";

export class Link {
    constructor(
        public targetNode: Node,
        public condition: Condition,
        public line: any
    ) { }

}
