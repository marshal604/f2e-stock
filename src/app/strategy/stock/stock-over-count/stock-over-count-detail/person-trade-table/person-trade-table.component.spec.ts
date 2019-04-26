/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonTradeTableComponent } from './person-trade-table.component';

describe('PersonTradeTableComponent', () => {
  let component: PersonTradeTableComponent;
  let fixture: ComponentFixture<PersonTradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonTradeTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
