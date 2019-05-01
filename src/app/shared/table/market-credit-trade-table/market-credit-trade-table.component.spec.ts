/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarketCreditTradeTableComponent } from './market-credit-trade-table.component';

describe('MarketCreditTradeTableComponent', () => {
  let component: MarketCreditTradeTableComponent;
  let fixture: ComponentFixture<MarketCreditTradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketCreditTradeTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCreditTradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
