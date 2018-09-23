import { Component, OnInit } from '@angular/core';
import { Block } from '../block';
import { SourceStructure } from '../source-structure';
import { TargetStructure } from '../target-structure';


@Component({
  selector: 'app-structure-mapper',
  templateUrl: './structure-mapper.component.html',
  styleUrls: ['./structure-mapper.component.css']
})
export class StructureMapperComponent implements OnInit {

  sourceChildren = [ new Block('nick', null),
                     new Block('kevin', null)
                   ];
  targetChildren = [ new Block('roger', null),
                     new Block('novak', null)
                   ];

  sourceRoot = new Block('john', this.sourceChildren);
  targetRoot = new Block('bjorn', this.targetChildren);

  source = new SourceStructure(this.sourceRoot);
  target = new TargetStructure(this.targetRoot);

  constructor() { }

  ngOnInit() {
  }

}
