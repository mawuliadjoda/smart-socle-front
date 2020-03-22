/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { D3OrgChartComponent } from './d3-org-chart.component';

describe('D3OrgChartComponent', () => {
  let component: D3OrgChartComponent;
  let fixture: ComponentFixture<D3OrgChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3OrgChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3OrgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
