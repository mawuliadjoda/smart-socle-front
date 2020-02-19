/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JqxchartComponent } from './jqxchart.component';

describe('JqxchartComponent', () => {
  let component: JqxchartComponent;
  let fixture: ComponentFixture<JqxchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqxchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqxchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
