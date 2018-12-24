import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocApprovalComponent } from './doc-approval.component';

describe('DocApprovalComponent', () => {
  let component: DocApprovalComponent;
  let fixture: ComponentFixture<DocApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
