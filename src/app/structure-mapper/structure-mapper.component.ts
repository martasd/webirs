import { Component, OnInit } from '@angular/core';
import { Block } from '../block';
import { Mapping } from '../mapping';
import { SourceStructure } from '../source-structure';
import { TargetStructure } from '../target-structure';

@Component({
  selector: 'app-structure-mapper',
  templateUrl: './structure-mapper.component.html',
  styleUrls: ['./structure-mapper.component.css']
})
export class StructureMapperComponent implements OnInit {
  sourceChildren = [
    new Block('nick', [ new Block ('nick\'s child1', [ new Block ('nick\'s grandchild1', null),
    new Block ('nick\'s grandchild2', null)]),
    new Block ('nick\'s child2', null)]),
    new Block('kevin', [ new Block ('kevin\'s child1', null),
    new Block ('kevin\'s child2', null)])
  ];
  targetChildren = [
    new Block('roger', null),
    new Block('novak', null)
  ];

  sourceRoot = new Block('john', this.sourceChildren);
  targetRoot = new Block('bjorn', this.targetChildren);

  source = new SourceStructure(this.sourceRoot);
  target = new TargetStructure(this.targetRoot);

  testMappings = [new Mapping(this.sourceRoot, this.targetRoot, null)];

  constructor() {

  }

  ngOnInit() {
  }
}
