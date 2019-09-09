import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOperationComponent } from './stock-operation.component';

describe('StockOperationComponent', () => {
  let component: StockOperationComponent;
  let fixture: ComponentFixture<StockOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
