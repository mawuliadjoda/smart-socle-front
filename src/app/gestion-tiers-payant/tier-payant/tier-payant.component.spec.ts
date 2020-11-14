/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TierPayantComponent } from './tier-payant.component';

describe('TierPayantComponent', () => {
  let component: TierPayantComponent;
  let fixture: ComponentFixture<TierPayantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TierPayantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TierPayantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
