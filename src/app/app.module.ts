import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoRepository } from './todo/domain/todo.repository';
import { InMemoryTodoRepository } from './todo/infra/in-memory-todo.repository';
import { TodoItemComponent } from './ui/todo-item/todo-item.component';

@NgModule({
  declarations: [AppComponent, TodoItemComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: TodoRepository,
      useClass: InMemoryTodoRepository,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
