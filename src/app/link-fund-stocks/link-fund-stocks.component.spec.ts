import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFundStocksComponent } from './link-fund-stocks.component';

describe('LinkFundStocksComponent', () => {
  let component: LinkFundStocksComponent;
  let fixture: ComponentFixture<LinkFundStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkFundStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkFundStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
