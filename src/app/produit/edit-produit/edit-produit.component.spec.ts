/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditProduitComponent } from './edit-produit.component';

describe('EditProduitComponent', () => {
  let component: EditProduitComponent;
  let fixture: ComponentFixture<EditProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});