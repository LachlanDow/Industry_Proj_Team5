import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageComponentComponent } from './settings-page-component.component';

describe('SettingsPageComponentComponent', () => {
  let component: SettingsPageComponentComponent;
  let fixture: ComponentFixture<SettingsPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPageComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
