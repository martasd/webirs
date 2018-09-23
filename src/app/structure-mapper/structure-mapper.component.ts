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
    new Block('nick', null, null),
    new Block('kevin', null, null)
  ];
  targetChildren = [
    new Block('roger', null, null),
    new Block('novak', null, null)
  ];

  sourceRoot = new Block('john', null, this.sourceChildren);
  targetRoot = new Block('bjorn', null, this.targetChildren);

  source = new SourceStructure(this.sourceRoot);
  target = new TargetStructure(this.targetRoot);

  testMappings = [new Mapping(this.sourceRoot, this.targetRoot, null)];

  constructor() {

    this.sourceRoot.mappings = this.testMappings;
    this.targetRoot.mappings = this.testMappings;
  }

  ngOnInit() {
  }
}
