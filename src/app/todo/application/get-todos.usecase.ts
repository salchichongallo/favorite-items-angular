import { Observable, from, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Todo } from '../domain/todo';
import { TodoRepository } from '../domain/todo.repository';

@Injectable({ providedIn: 'root' })
export class GetTodosUseCase {
  constructor(private todoRepo: TodoRepository) {}

  execute(): Observable<Todo[]> {
    return from(this.todoRepo.fetchAll()).pipe(
      switchMap(() => this.todoRepo.todos)
    );
  }
}
