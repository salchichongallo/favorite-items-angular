import { Observable } from 'rxjs';
import { Todo } from './todo';

export class TodosNotAvailable extends Error {
  override message = 'No fue posible obtener las tareas pendientes';
}

export abstract class TodoGateway {
  abstract getTodos(): Observable<Todo[]>;
}
