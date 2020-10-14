import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  displayJoinGame = false;
  constructor() { }

  ngOnInit(): void {
  }



  onPress() {
    this.displayJoinGame = true;
    console.log(this.displayJoinGame);
  }
  onPressJoin(){

  }
}
