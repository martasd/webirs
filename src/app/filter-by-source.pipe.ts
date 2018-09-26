import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './link';
import { Node } from './node';

@Pipe({
  name: 'filterBySource'
})
export class FilterBySourcePipe implements PipeTransform {

  /**
  * Retrieve the source node's links.
  * @param links - the array of all links
  * @param sourceNode - the source node whose links to retrieve
  */
  transform(links: Link[], sourceNode: Node): Link[] {

    const nodeLinks: Link[] = null;

    for (const link of links) {
      if (link.sourceNode === sourceNode) {
        nodeLinks.push(link);
      }
      return nodeLinks;
    }
  }
}
