import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragulaMapperComponent } from './dragula-mapper.component';

describe('DragulaMapperComponent', () => {
  let component: DragulaMapperComponent;
  let fixture: ComponentFixture<DragulaMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragulaMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragulaMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
