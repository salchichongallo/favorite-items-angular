import { Observable, catchError, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo/domain/todo';
import { GetTodosUseCase } from './todo/application/get-todos.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  constructor(public getTodosUseCase: GetTodosUseCase) {}

  error: any = null;

  todos$!: Observable<Todo[]>;

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    console.log('Loading Todos');
    this.todos$ = this.getTodosUseCase.execute().pipe(
      tap(() => (this.error = null)),
      catchError((error) => {
        this.error = error;
        return [];
      })
    );
  }
}
