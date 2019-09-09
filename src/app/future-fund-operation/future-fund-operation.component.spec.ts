import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureFundOperationComponent } from './future-fund-operation.component';

describe('FutureFundOperationComponent', () => {
  let component: FutureFundOperationComponent;
  let fixture: ComponentFixture<FutureFundOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureFundOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureFundOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
