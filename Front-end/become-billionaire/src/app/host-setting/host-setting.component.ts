import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-setting',
  templateUrl: './host-setting.component.html',
  styleUrls: ['./host-setting.component.css']
})
export class HostSettingComponent implements OnInit {
  slidervalue = 75;
  constructor() { }

  ngOnInit(): void {
  }

}


