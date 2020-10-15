import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  display = false;

  constructor() { }

  ngOnInit(): void {
  }

  onPress() {
    this.display = true;
  }

}
