import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question } from './quiz.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  public getJSON(fileId: string) {
    return this.http.get(`./assets/${fileId}.json`) as Observable<any>;
  }
  
  public getQuizzes() {
    return this.http.get(`./assets/quiz-list.json`).pipe(
      map((result: any[]) => {
        return result.map(results => new Quiz(results.label, results.name, results.description, results.fileName));
      })
    );
  }

  public getQuestions(fileName: string) {
    return this.http.get(`./assets/${fileName}.json`).pipe(
      map((result: any[]) => {
        return result.map(results => new Question(results.label, results.choices));
      })
    );
  }
}
