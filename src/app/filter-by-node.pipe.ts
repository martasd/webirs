import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './link';
import { Node, NodeDirection } from './node';

@Pipe({
  name: 'filterByNode'
})
export class FilterByNodePipe implements PipeTransform {

  /**
  * Retrieve the source node's links.
  * @param links - the array of all links
  * @param node - the node whose links to retrieve
  */
  transform(links: Link[], node: Node): string[] {

    const linkNodeNames: string[] = [];

    if (node.direction === NodeDirection.Input) {
      for (const link of links) {
        if (link.sourceNode === node) {
          linkNodeNames.push(link.targetNode.name);
        }
      }
    } else {
      for (const link of links) {
        if (link.targetNode === node) {
          linkNodeNames.push(link.sourceNode.name);
        }
      }
    }
    return linkNodeNames;
  }
}
