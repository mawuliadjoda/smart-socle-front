/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditRefProduitComponent } from './edit-ref-produit.component';

describe('EditRefProduitComponent', () => {
  let component: EditRefProduitComponent;
  let fixture: ComponentFixture<EditRefProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRefProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRefProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
