/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatJournaliereComponent } from './stat-journaliere.component';

describe('StatJournaliereComponent', () => {
  let component: StatJournaliereComponent;
  let fixture: ComponentFixture<StatJournaliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatJournaliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatJournaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
