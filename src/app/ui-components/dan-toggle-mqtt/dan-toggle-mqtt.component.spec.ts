/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanToggleMqttComponent } from './dan-toggle-mqtt.component';

describe('DanToggleMqttComponent', () => {
  let component: DanToggleMqttComponent;
  let fixture: ComponentFixture<DanToggleMqttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanToggleMqttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanToggleMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
