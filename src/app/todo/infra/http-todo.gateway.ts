import { Observable, catchError } from 'rxjs';
import { Todo } from '../domain/todo';
import { TodosNotAvailable, TodoGateway } from '../domain/todo.gateway';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpTodoGateway implements TodoGateway {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('http://localhost:8000/todos/').pipe(
      catchError(() => {
        throw new TodosNotAvailable();
      }),
    );
  }
}
