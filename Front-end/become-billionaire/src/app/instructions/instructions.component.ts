import { Component } from '@angular/core';
import  {AppComponent } from '../app.component'

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent  {
  clicked_back = false;

  constructor(private appComponent: AppComponent) { }


  onClickBack() {
   this.clicked_back = true;
   this.appComponent.displayInstructions = false;
  }

}
