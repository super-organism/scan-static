import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepswdComponent } from './repswd.component';

describe('RepswdComponent', () => {
  let component: RepswdComponent;
  let fixture: ComponentFixture<RepswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
