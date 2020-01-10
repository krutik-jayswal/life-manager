import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToSavingsComponent } from './move-to-savings.component';

describe('MoveToSavingsComponent', () => {
  let component: MoveToSavingsComponent;
  let fixture: ComponentFixture<MoveToSavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveToSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveToSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
