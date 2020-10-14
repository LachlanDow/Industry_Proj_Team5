import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  display = false;
  @Input() hostId;

  constructor() { }

  ngOnInit(): void {
    console.log("lobby");
    console.log("lobby", this.hostId);
  }


  onPress() {
    this.display = true;
    }

}
