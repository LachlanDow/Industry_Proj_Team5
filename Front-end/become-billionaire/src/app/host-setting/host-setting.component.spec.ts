import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { HostSettingComponent } from './host-setting.component';
import  {AppComponent } from '../app.component'


describe('HostSettingComponent', () => {
  let component: HostSettingComponent;
  let fixture: ComponentFixture<HostSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostSettingComponent,AppComponent ],
      imports: [HttpClientModule],
      providers: [AppComponent]
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

  it('Pressing leaderboard button turns display leaderBoard True', () => {
    const fixture = TestBed.createComponent(HostSettingComponent);
    const app = fixture.componentInstance;
    app.gohome();
    expect(app.display).toBeTruthy();
  });
});
