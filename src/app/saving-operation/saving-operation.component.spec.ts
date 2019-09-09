import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingOperationComponent } from './saving-operation.component';

describe('SavingOperationComponent', () => {
  let component: SavingOperationComponent;
  let fixture: ComponentFixture<SavingOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
