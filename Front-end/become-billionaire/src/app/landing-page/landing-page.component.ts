import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  displayHost = false;

  onPressHost() {
    this.displayHost = true;
    console.log(this.displayHost);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
