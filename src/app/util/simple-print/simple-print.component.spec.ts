/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimplePrintComponent } from './simple-print.component';

describe('SimplePrintComponent', () => {
  let component: SimplePrintComponent;
  let fixture: ComponentFixture<SimplePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
