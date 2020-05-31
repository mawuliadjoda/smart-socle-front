/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeleteCommandeEntrantAttenteComponent } from './delete-commande-entrant-attente.component';

describe('DeleteCommandeEntrantAttenteComponent', () => {
  let component: DeleteCommandeEntrantAttenteComponent;
  let fixture: ComponentFixture<DeleteCommandeEntrantAttenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCommandeEntrantAttenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCommandeEntrantAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
