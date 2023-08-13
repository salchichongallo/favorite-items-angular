import { BehaviorSubject } from 'rxjs';
import { Todo } from '../domain/todo';
import { TodoRepository } from '../domain/todo.repository';

export class InMemoryTodoRepository implements TodoRepository {
  todosSubject = new BehaviorSubject<Todo[]>([]);

  todos = this.todosSubject.asObservable();

  async fetchAll(): Promise<void> {
    await this.checkConnection();
    this.todosSubject.next([
      {
        id: '1',
        name: 'Item 1',
        description: 'Description 1',
        isFavorite: true,
      },
      {
        id: '2',
        name: 'April Dibbert',
        description: 'Author, philosopher, foodie',
        isFavorite: false,
      },
      {
        id: '3',
        name: 'Myron Douglas',
        description: 'Final devotee, foodie',
        isFavorite: false,
      },
      {
        id: '4',
        name: 'Jeremy Mante',
        description: 'Streamer, patriot, teacher',
        isFavorite: false,
      },
    ]);
  }

  private checkConnection() {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const shouldThrow = Math.random() > 0.5;
        if (shouldThrow) {
          resolve(undefined);
        } else {
          reject(new Error('Connection error'));
        }
      }, 250)
    );
  }

  async toggleFavorite(todoId: string): Promise<void> {
    await this.checkConnection();
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
