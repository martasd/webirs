import { Component, OnInit, ViewChildren } from '@angular/core'; import { Links } from '../links';
import { NodeType, NodeDirection, Node } from '../node';
import { SourceStructure } from '../source-structure';
import { TargetStructure } from '../target-structure';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Link } from '../link';
// import { LeaderLine } from 'leader-line';

declare var LeaderLine: any;
@Component({
  selector: 'app-structure-mapper',
  templateUrl: './structure-mapper.component.html',
  styleUrls: ['./structure-mapper.component.css']
})
export class StructureMapperComponent implements OnInit {

  subs = new Subscription();
  @ViewChildren("sourceRef") sourceRef;
  @ViewChildren("targetRef") targetRef;

  // Create test data structures
  sourceChildren = [
    new Node('nick', NodeType.Block, NodeDirection.Input, [
      new Node('nick\'s child1', NodeType.Block, NodeDirection.Input, [
        new Node('nick\'s grandchild1', NodeType.Block, NodeDirection.Input, null),
        new Node('nick\'s grandchild2', NodeType.Block, NodeDirection.Input, null)
      ]),
      new Node('nick\'s child2', NodeType.Block, NodeDirection.Input, null)
    ]),
    new Node('kevin', NodeType.Block, NodeDirection.Input, [
      new Node('kevin\'s child1', NodeType.Block, NodeDirection.Input, null),
      new Node('kevin\'s child2', NodeType.Block, NodeDirection.Input, null)
    ])
  ];
  targetChildren = [
    new Node('roger', NodeType.Block, NodeDirection.Output, null),
    new Node('novak', NodeType.Block, NodeDirection.Output, null)
  ];
  sourceRoot = new Node('john', NodeType.Block, NodeDirection.Input, this.sourceChildren);
  targetRoot = new Node('bjorn', NodeType.Block, NodeDirection.Output, this.targetChildren);
  sourceList = [this.sourceRoot];
  targetList = [this.targetRoot];
  source = new SourceStructure(this.sourceRoot);
  target = new TargetStructure(this.targetRoot);
  links = new Links();

  // Find the target reference
  // input: targetNodeComponentRef- target NodeComponent
  findTargetRef(targetNodeComponentRef, targetNode) {

    if (targetNodeComponentRef.node === targetNode) {
      return targetNodeComponentRef.nodeRef;
    }
    var children = targetNodeComponentRef.childrenRef.toArray();
    for (var nodeComponentRef of children) {
      var targetRef = this.findTargetRef(nodeComponentRef, targetNode);

      if (targetRef) {
        return targetRef;
      }
    };
  }

  // For each node draw a link to its target
  // input: sourceNodeRef- source NodeComponent
  drawLinks(sourceNodeComponentRef) {

    // Retrieve the source node's links from the Links Map
    var sourceNode = sourceNodeComponentRef.node;
    if (this.links.linksMap.has(sourceNode)) {
      var link = this.links.linksMap.get(sourceNode);

      var sourceNodeRef = sourceNodeComponentRef.nodeRef;
      // TODO: Right now, assume there is only one target node
      var targetNodeRef = this.findTargetRef(this.targetRef.first, link.targetNode);

      // Draw the link
      var sourceElement = sourceNodeRef.nativeElement;
      var targetElement = targetNodeRef.nativeElement;

      link.line = new LeaderLine(sourceElement, targetElement, {
        startPlug: 'disc',
        dash: { animation: true }
      });
      this.links.lineMap.set(sourceElement.textContent, link.line);
    }

    sourceNodeComponentRef.childrenRef.forEach(NodeComponentRef => {
      this.drawLinks(NodeComponentRef);
    });
  }

  constructor(private dragulaService: DragulaService) {

    this.dragulaService.createGroup("NODES", {

      // Avoid dragging from output to input structure
      accepts: (el, target, source, sibling) => {
        return !(target.id === 'input' && source.id === 'output');
      }
    });

    this.dragulaService.dropModel("NODES").subscribe(args => {
      console.log(args);
    });

    // Listen to Dragula events 
    this.subs.add(this.dragulaService.drag("NODES")
      .subscribe(({ name, el, source }) => {
        // Retrieve lines from the map and hide them
        var elText = el.firstChild.firstChild.textContent;
        if (this.links.lineMap.has(elText)) {
          var line = this.links.lineMap.get(elText);
          line.hide();
        }
      }));

    this.subs.add(this.dragulaService.drop("NODES")
      .subscribe(({ name, el, target, source, sibling }) => {

        // Remove all lines
        for (let link of this.links.linksMap.values()) {
          if (link.line != null) {
            link.line.remove();
            link.line = null;
          }
        }
        this.links.lineMap.clear();

        // Recreate all lines
        this.drawLinks(this.sourceRef.first);
      }));

    // Initialize links map
    this.links.linksMap.set(this.sourceRoot, new Link(this.targetRoot, null, null));
    this.links.linksMap.set(this.sourceChildren[0], new Link(this.targetChildren[0], null, null));
    this.links.linksMap.set(this.sourceChildren[1], new Link(this.targetChildren[1], null, null));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Draw links starting from the tree source node
    this.drawLinks(this.sourceRef.first);
  }

  ngOnDestroy() {
    // Destroy all the subscriptions at once
    this.subs.unsubscribe();
  }
}
