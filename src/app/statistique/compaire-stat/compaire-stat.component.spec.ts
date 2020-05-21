/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompaireStatComponent } from './compaire-stat.component';

describe('CompaireStatComponent', () => {
  let component: CompaireStatComponent;
  let fixture: ComponentFixture<CompaireStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaireStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaireStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
