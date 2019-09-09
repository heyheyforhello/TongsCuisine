import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttackPage } from './add-attack.page';

describe('AddAttackPage', () => {
  let component: AddAttackPage;
  let fixture: ComponentFixture<AddAttackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
