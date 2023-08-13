import { HttpTodoGateway } from './http-todo.gateway';
import { Injectable } from '@angular/core';
import { TodoRepository } from '../domain/todo.repository';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Todo } from '../domain/todo';

@Injectable({
  providedIn: 'root',
})
export class HttpTodoRepository implements TodoRepository {
  todosSubject = new BehaviorSubject<Todo[]>([]);

  todos = this.todosSubject.asObservable();
  constructor(private httpTodoGateway: HttpTodoGateway) {}

  async fetchAll(): Promise<void> {
    const todos = await lastValueFrom(this.httpTodoGateway.getTodos());
    this.todosSubject.next(todos);
  }
  async toggleFavorite(todoId: string): Promise<void> {
    const todos = this.todosSubject.value.map((todo) => {
      if (todo.id !== todoId) return todo;
      return { ...todo, isFavorite: !todo.isFavorite };
    });
    this.todosSubject.next(todos);
  }

  async countFavorites(): Promise<number> {
    return this.todosSubject.value.filter((todo) => todo.isFavorite).length;
  }
}
