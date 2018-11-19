import { Node } from "./node";
import { Condition } from "./condition";
import { LeaderLine } from "leader-line";

export class Link {
    constructor(
        public targetNode: Node,
        public condition: Condition,
        public line: LeaderLine
    ) { }

}
