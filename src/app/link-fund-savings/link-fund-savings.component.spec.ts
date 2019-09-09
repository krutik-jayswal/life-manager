import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFundSavingsComponent } from './link-fund-savings.component';

describe('LinkFundSavingsComponent', () => {
  let component: LinkFundSavingsComponent;
  let fixture: ComponentFixture<LinkFundSavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkFundSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkFundSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
