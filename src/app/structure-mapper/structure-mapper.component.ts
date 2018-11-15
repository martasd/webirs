import { Component, OnInit, ViewChildren } from '@angular/core';
import { Block } from '../block';
import { Link } from '../link';
import { NodeDirection } from '../node';
import { SourceStructure } from '../source-structure';
import { TargetStructure } from '../target-structure';
import { DragulaService } from 'ng2-dragula';

declare var LeaderLine: any;
@Component({
  selector: 'app-structure-mapper',
  templateUrl: './structure-mapper.component.html',
  styleUrls: ['./structure-mapper.component.css']
})
export class StructureMapperComponent implements OnInit {

  @ViewChildren("sourceRef") sourceRef;
  @ViewChildren("targetRef") targetRef;

  // Create test nodes
  sourceChildren = [
    new Block('nick', NodeDirection.Input, [
      new Block('nick\'s child1', NodeDirection.Input, [
        new Block('nick\'s grandchild1', NodeDirection.Input, null),
        new Block('nick\'s grandchild2', NodeDirection.Input, null)
      ]),
      new Block('nick\'s child2', NodeDirection.Input, null)
    ]),
    new Block('kevin', NodeDirection.Input, [
      new Block('kevin\'s child1', NodeDirection.Input, null),
      new Block('kevin\'s child2', NodeDirection.Input, null)
    ])
  ];
  targetChildren = [
    new Block('roger', NodeDirection.Output, null),
    new Block('novak', NodeDirection.Output, null)
  ];
  sourceRoot = new Block('john', NodeDirection.Input, this.sourceChildren);
  targetRoot = new Block('bjorn', NodeDirection.Output, this.targetChildren);
  sourceList = [this.sourceRoot];
  targetList = [this.targetRoot];
  source = new SourceStructure(this.sourceRoot);
  target = new TargetStructure(this.targetRoot);
  linksMap = new Map();

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
    if (this.linksMap.has(sourceNode)) {
      // TODO: Right now, assume there is only one target node
      var targetNode = this.linksMap.get(sourceNode);

      var sourceNodeRef = sourceNodeComponentRef.nodeRef;
      var targetNodeRef = this.findTargetRef(this.targetRef.first, targetNode);

      // Draw the link
      var line = new LeaderLine(sourceNodeRef.nativeElement, targetNodeRef.nativeElement);
    }

    sourceNodeComponentRef.childrenRef.forEach(NodeComponentRef => {
      this.drawLinks(NodeComponentRef);
    });
  }

  constructor(private dragulaService: DragulaService) {

    this.dragulaService.createGroup("NODES", {
      // ...
    });

    this.dragulaService.dropModel("NODES").subscribe(args => {
      console.log(args);
    });

    // Initialize links map
    this.linksMap.set(this.sourceRoot, this.targetRoot);
    this.linksMap.set(this.sourceChildren[0], this.targetChildren[0])
    this.linksMap.set(this.sourceChildren[1], this.targetChildren[1])
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Iterate through refNodes of the source tree 
    this.drawLinks(this.sourceRef.first);
  }
}
