import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGameLobbyComponent } from './join-game-lobby.component';

describe('JoinGameLobbyComponent', () => {
  let component: JoinGameLobbyComponent;
  let fixture: ComponentFixture<JoinGameLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGameLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
