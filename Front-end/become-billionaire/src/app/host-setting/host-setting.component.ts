import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

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
export class SelectCustomTriggerExample {
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}


