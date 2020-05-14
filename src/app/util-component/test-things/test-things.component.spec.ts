/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestThingsComponent } from './test-things.component';

describe('TestThingsComponent', () => {
  let component: TestThingsComponent;
  let fixture: ComponentFixture<TestThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestThingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
