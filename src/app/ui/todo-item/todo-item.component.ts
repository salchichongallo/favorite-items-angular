import { Component, Input } from '@angular/core';
import { Todo } from '../../todo/domain/todo';
import { MaxTodosReached } from '../../todo/domain/todo.service';
import { ToggleFavoriteUseCase } from '../../todo/application/toggle-favorite.usecase';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private toggleUseCase: ToggleFavoriteUseCase) {}

  async toggleFavorite(todo: Todo) {
    console.log('Toggling...');
    try {
      await this.toggleUseCase.execute(todo);
    } catch (error) {
      if (error instanceof MaxTodosReached) {
        alert('Error: Ha superado el límite de favoritos');
      } else {
        alert('Ocurrió un error');
      }
    }
  }
}
