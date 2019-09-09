import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRecordPage } from './daily-record.page';

describe('DailyRecordPage', () => {
  let component: DailyRecordPage;
  let fixture: ComponentFixture<DailyRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
