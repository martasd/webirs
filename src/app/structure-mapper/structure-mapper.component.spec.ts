import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureMapperComponent } from './structure-mapper.component';

describe('StructureMapperComponent', () => {
  let component: StructureMapperComponent;
  let fixture: ComponentFixture<StructureMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
