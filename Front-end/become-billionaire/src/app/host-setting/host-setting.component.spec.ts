import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostSettingComponent } from './host-setting.component';

describe('HostSettingComponent', () => {
  let component: HostSettingComponent;
  let fixture: ComponentFixture<HostSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
