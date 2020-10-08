import { Component } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent  {
  clicked_back = false;

  constructor() { }

  ngAfterViewChecked(){ 
    this.clicked_back = false;
  }

  onClickBack() {
   this.clicked_back = true;
  }

}
