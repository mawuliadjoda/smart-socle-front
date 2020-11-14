/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTierPayantComponent } from './add-tier-payant.component';

describe('AddTierPayantComponent', () => {
  let component: AddTierPayantComponent;
  let fixture: ComponentFixture<AddTierPayantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTierPayantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTierPayantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
