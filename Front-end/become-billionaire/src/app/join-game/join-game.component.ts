import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  display = false;
  constructor() { }

  ngOnInit(): void {
  }



  onPress() {
    this.display = true;
    console.log(this.display);
  }
  onPressJoin(){

  }
}
