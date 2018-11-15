import { Component, OnInit, ViewChildren } from '@angular/core';
import { Block } from '../block';
import { Link } from '../link';
import { NodeDirection } from '../node';
import { SourceStructure } from '../source-structure';
import { TargetStructure } from '../target-structure';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-structure-mapper',
  templateUrl: './structure-mapper.component.html',
  styleUrls: ['./structure-mapper.component.css']
})
export class StructureMapperComponent implements OnInit {

  @ViewChildren("sourceRef") sourceRef;

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

  constructor(private dragulaService: DragulaService) {

    this.dragulaService.createGroup("NODES", {
      // ...
    });

    this.dragulaService.dropModel("NODES").subscribe(args => {
      console.log(args);
    });

    // Initialize links map
    this.linksMap.set(this.sourceRoot, this.targetRoot);
  }

  ngOnInit() {


  }

  ngAfterViewInit() {

    console.log(this.sourceRef.nativeElement.textContent);
    // TODO
    // Iterate through refNodes of the source tree 

    // Retrieve the source node's links from the Links Map
    // if (this.linksMap.has(this.node)) {
    //   this.linksMap.get(this.node);

    // Traverse the target tree to find the target refNode

    // Draw the link
    // var line = new LeaderLine(this.start.nativeElement, this.end.nativeElement);

  }
}
