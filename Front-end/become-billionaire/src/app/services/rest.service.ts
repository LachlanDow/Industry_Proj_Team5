import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  getData() {
    const url = 'http://35.214.82.56:3000/quiz/5f8474455696c936d2dea57e';
    return this.http.get(url);
  }
}
