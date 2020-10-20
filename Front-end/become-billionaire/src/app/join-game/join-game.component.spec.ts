import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { JoinGameComponent, User } from './join-game.component';

describe('JoinGameComponent', () => {
  let component: JoinGameComponent;
  let fixture: ComponentFixture<JoinGameComponent>;
  let usernameEl: DebugElement;
  let partyCodeEl: DebugElement;
  let joinGameEl: DebugElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameComponent);
    component = fixture.componentInstance;
    
    usernameEl = fixture.debugElement.query(By.css('input[type=username]'));
    partyCodeEl = fixture.debugElement.query(By.css('input[type=partyCode]'))
    joinGameEl = fixture.debugElement.query(By.css('button'))
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Entering Username and Party Code emits joinGame event', () => {
    let user: User;

    usernameEl.nativeElement.value = "testUsername1"; 
    partyCodeEl.nativeElement.value = "123456";
  
    component.userEnter.subscribe((value) => user = value);
  
    joinGameEl.triggerEventHandler('click', null);
  
    expect(user.username).toBe("testUsername1");
    expect(user.partyCode).toBe("123456");
  });
});
