/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TradeCountChartComponent } from './trade-count-chart.component';

describe('TradeCountChartComponent', () => {
  let component: TradeCountChartComponent;
  let fixture: ComponentFixture<TradeCountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradeCountChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
