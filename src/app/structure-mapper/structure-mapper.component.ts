import { Component, OnInit, ViewChildren } from '@angular/core';
import { Block } from '../block';
import { Links } from '../links';
import { NodeDirection } from '../node';
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
    if (this.links.map.has(sourceNode)) {
      var link = this.links.map.get(sourceNode);

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
      // ...
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
          // console.log(line);
        }
      }));

    this.subs.add(this.dragulaService.drop("NODES")
      .subscribe(({ name, el, target, source, sibling }) => {

        var elText = el.firstChild.firstChild.textContent;
        if (this.links.lineMap.has(elText)) {
          var line = this.links.lineMap.get(elText);
          line.show();
        }

        // Redraw all lines
        this.links.lineMap.forEach(curLine => {
          curLine.position();
        });

      }));

    // Initialize links map
    this.links.map.set(this.sourceRoot, new Link(this.targetRoot, null, null));
    this.links.map.set(this.sourceChildren[0], new Link(this.targetChildren[0], null, null));
    this.links.map.set(this.sourceChildren[1], new Link(this.targetChildren[1], null, null));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Iterate through refNodes of the source tree 
    this.drawLinks(this.sourceRef.first);

    //console.log(this.links.lineMap);
  }
}
