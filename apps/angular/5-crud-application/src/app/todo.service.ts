import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private httpClient = inject(HttpClient);
  private readonly todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  getAllTodos() {
    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  update(todo: Todo) {
    this.httpClient.put<Todo>(
      `${this.todoUrl}/${todo.id}`,
      JSON.stringify({
        id: todo.id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.todoUrl}/${id}`);
  }
}
