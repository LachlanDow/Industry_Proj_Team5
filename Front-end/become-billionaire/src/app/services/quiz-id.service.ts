import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuizIdService {
  private messageSource = new BehaviorSubject<number>(0);

  currentMessage = this.messageSource.asObservable();

  changeMessage(quizID: number) {
    this.messageSource.next(quizID);
  }

  constructor() { }
}
