/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GererTierPayantComponent } from './gerer-tier-payant.component';

describe('GererTierPayantComponent', () => {
  let component: GererTierPayantComponent;
  let fixture: ComponentFixture<GererTierPayantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererTierPayantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererTierPayantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
