/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockCreditTradeTableComponent } from './stock-credit-trade-table.component';

describe('StockCreditTradeTableComponent', () => {
  let component: StockCreditTradeTableComponent;
  let fixture: ComponentFixture<StockCreditTradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockCreditTradeTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCreditTradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
