/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockOverCountComponent } from './stock-over-count.component';

describe('StockOverCountComponent', () => {
  let component: StockOverCountComponent;
  let fixture: ComponentFixture<StockOverCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockOverCountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOverCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
