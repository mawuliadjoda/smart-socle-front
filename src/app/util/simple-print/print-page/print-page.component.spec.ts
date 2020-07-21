/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrintPageComponent } from './print-page.component';

describe('PrintPageComponent', () => {
  let component: PrintPageComponent;
  let fixture: ComponentFixture<PrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
