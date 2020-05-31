/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RefProduitComponent } from './ref-produit.component';

describe('RefProduitComponent', () => {
  let component: RefProduitComponent;
  let fixture: ComponentFixture<RefProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
