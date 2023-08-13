import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoRepository } from './todo/domain/todo.repository';
import { TodoItemComponent } from './ui/todo-item/todo-item.component';
import { HttpTodoRepository } from './todo/infra/http-todo.repository';
import { HttpClientModule } from '@angular/common/http';
import { TodoGateway } from './todo/domain/todo.gateway';
import { HttpTodoGateway } from './todo/infra/http-todo.gateway';

@NgModule({
  declarations: [AppComponent, TodoItemComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: TodoRepository,
      useClass: HttpTodoRepository,
    },
    { provide: TodoGateway, useClass: HttpTodoGateway },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
