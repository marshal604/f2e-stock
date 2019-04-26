/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockOverCountDetailComponent } from './stock-over-count-detail.component';

describe('StockOverCountDetailComponent', () => {
  let component: StockOverCountDetailComponent;
  let fixture: ComponentFixture<StockOverCountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockOverCountDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOverCountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
