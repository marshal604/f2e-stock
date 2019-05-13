/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvestorIntegrateTableComponent } from './investor-integrate-table.component';

describe('InvestorIntegrateTableComponent', () => {
  let component: InvestorIntegrateTableComponent;
  let fixture: ComponentFixture<InvestorIntegrateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorIntegrateTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorIntegrateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
