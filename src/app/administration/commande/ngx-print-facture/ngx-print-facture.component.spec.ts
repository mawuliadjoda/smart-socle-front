/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxPrintFactureComponent } from './ngx-print-facture.component';

describe('NgxPrintFactureComponent', () => {
  let component: NgxPrintFactureComponent;
  let fixture: ComponentFixture<NgxPrintFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPrintFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPrintFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
