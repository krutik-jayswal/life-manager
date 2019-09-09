import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordOperationComponent } from './password-operation.component';

describe('PasswordOperationComponent', () => {
  let component: PasswordOperationComponent;
  let fixture: ComponentFixture<PasswordOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
