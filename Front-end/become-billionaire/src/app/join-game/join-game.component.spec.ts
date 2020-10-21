import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JoinGameComponent, User } from './join-game.component';
import { HttpClientModule } from '@angular/common/http'
import { __assign } from 'tslib';




describe('JoinGameComponent', () => {
  let component: JoinGameComponent;
  let fixture: ComponentFixture<JoinGameComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGameComponent],
      imports: [HttpClientModule],
      providers: [],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display app should be false', () =>{
    expect(component.displayApp).toBeFalse();
  });

  it('display JoinGameLobby should be false', () =>{
    expect(component.displayJoinGameLobby).toBeFalse();
  });

  it('Clicking Join Game should change join game lobby to true', () =>{
    component.startGame();
    expect(component.displayJoinGameLobby).toBeTruthy();
  });

  it('display app should be true after back button clicked', () =>{
    component.onPress()
    expect(component.displayApp).toBeTruthy();
  });
  it('display JoinGameLobby should be true after join game is pressed', () =>{
    component.startGame();
    expect(component.displayJoinGameLobby).toBeTruthy();
  });

});
