import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { TodoRepository } from './todo.repository';

const MAX_FAVORITE_TODOS = 2;

export class MaxTodosReached extends Error {}

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private todoRepo: TodoRepository) {}

  async toggle(todo: Todo) {
    if (!todo.isFavorite) {
      await this.checkFavoriteLimit();
    }
    await this.todoRepo.toggleFavorite(todo.id);
  }

  private async checkFavoriteLimit() {
    const totalFavorites = await this.todoRepo.countFavorites();
    if (totalFavorites >= MAX_FAVORITE_TODOS) {
      throw new MaxTodosReached();
    }
  }
}
