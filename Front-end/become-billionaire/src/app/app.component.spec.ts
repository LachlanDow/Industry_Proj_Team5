import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let settingsButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientModule],
    }).compileComponents();
  

  
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'become-billionaire'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('become-billionaire');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('BILLIONAIRE GOLF');
  });

  it('Pressing settings button turns displaysettings True', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onSettingsPress();
    expect(app.displaySettings).toBeTruthy();
  });

  it('Pressing join game button turns displayJoinPage to True', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onJoinPress();
    expect(app.displayJoinPage).toBeTruthy();
  });
  
  it('Pressing start Game turns displayHost to True', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onHostPress();
    expect(app.displayHost).toBeTruthy();
  });
  
  it('Pressing leaderboard button turns display leaderBoard True', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onLeaderboardPress();
    expect(app.displayLeaderboard).toBeTruthy();
  });

  
  it('Pressing Instructions button turns displayInstructions True', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onInstructionsPress();
    expect(app.displayInstructions).toBeTruthy();
  });
});
