import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeOperationComponent } from './income-operation.component';

describe('IncomeOperationComponent', () => {
  let component: IncomeOperationComponent;
  let fixture: ComponentFixture<IncomeOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
