import { Observable, from, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Todo } from '../domain/todo';
import { TodoRepository } from '../domain/todo.repository';

@Injectable({ providedIn: 'root' })
export class GetTodosUseCase {
  constructor(private todoRepo: TodoRepository) {}

  execute(): Observable<Todo[]> {
    return from(this.getTodos()).pipe(switchMap(() => this.todoRepo.todos));
  }

  private async getTodos() {
    return await this.todoRepo.fetchAll();
  }
}
