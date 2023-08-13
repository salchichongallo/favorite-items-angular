import { Injectable } from '@angular/core';
import { Todo } from '../domain/todo';
import { TodoRepository } from '../domain/todo.repository';

export class MaxTodosReached extends Error {}

const MAX_FAVORITE_TODOS = 2;

@Injectable({ providedIn: 'root' })
export class ToggleFavoriteUseCase {
  constructor(private todoRepo: TodoRepository) {}

  async execute(todo: Todo) {
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
