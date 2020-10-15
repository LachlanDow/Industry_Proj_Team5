import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  displayApp = false;
  constructor() { }

  ngOnInit(): void {
  }



  onPress() {
    this.displayApp = true;
    console.log(this.displayApp);
  }

  onPressJoin(username, partyCode){
    console.log(username.value);
    console.log(partyCode.value);
  }
}
