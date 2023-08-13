import { Observable } from 'rxjs';
import { Todo } from './todo';

export abstract class TodoRepository {
  abstract todos: Observable<Todo[]>;
  abstract fetchAll(): Promise<void>;
  abstract toggleFavorite(todoId: string): Promise<void>;
  abstract countFavorites(): Promise<number>;
}
