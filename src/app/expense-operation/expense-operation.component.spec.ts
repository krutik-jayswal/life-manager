import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseOperationComponent } from './expense-operation.component';

describe('ExpenseOperationComponent', () => {
  let component: ExpenseOperationComponent;
  let fixture: ComponentFixture<ExpenseOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
