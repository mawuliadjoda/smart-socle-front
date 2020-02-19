/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatistiqueComponent } from './statistique.component';

describe('StatistiqueComponent', () => {
  let component: StatistiqueComponent;
  let fixture: ComponentFixture<StatistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
