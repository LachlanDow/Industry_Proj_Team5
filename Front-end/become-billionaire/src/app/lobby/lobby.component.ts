import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  hostId: string;
  display = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  receiveHostId($event){
    this.hostId = "";
    this.hostId = $event;
    console.log(this.hostId);
  }

  onPress() {
    this.display = true;
    }

}
