import { Injectable } from '@angular/core';
import { Todo } from '../domain/todo';
import { TodoService } from '../domain/todo.service';

@Injectable({ providedIn: 'root' })
export class ToggleFavoriteUseCase {
  constructor(private todoService: TodoService) {}

  async execute(todo: Todo) {
    await this.todoService.toggle(todo);
  }
}
