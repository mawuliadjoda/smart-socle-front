/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RefMedicamentANSMComponent } from './refMedicamentANSM.component';

describe('RefMedicamentANSMComponent', () => {
  let component: RefMedicamentANSMComponent;
  let fixture: ComponentFixture<RefMedicamentANSMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefMedicamentANSMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefMedicamentANSMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
