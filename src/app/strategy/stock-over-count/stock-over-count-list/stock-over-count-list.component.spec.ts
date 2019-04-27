/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockOverCountListComponent } from './stock-over-count-list.component';

describe('StockOverCountListComponent', () => {
  let component: StockOverCountListComponent;
  let fixture: ComponentFixture<StockOverCountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockOverCountListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOverCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
