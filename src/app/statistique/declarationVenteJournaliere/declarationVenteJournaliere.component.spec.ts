/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeclarationVenteJournaliereComponent } from './declarationVenteJournaliere.component';

describe('DeclarationVenteJournaliereComponent', () => {
  let component: DeclarationVenteJournaliereComponent;
  let fixture: ComponentFixture<DeclarationVenteJournaliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationVenteJournaliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationVenteJournaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
