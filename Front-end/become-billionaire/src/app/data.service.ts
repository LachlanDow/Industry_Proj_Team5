import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<number>(101);

  currentMessage = this.messageSource.asObservable();

  changeMessage(message: number) {
    this.messageSource.next(message)
  }

  constructor() { }
}
