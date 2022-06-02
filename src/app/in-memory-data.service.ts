import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { name: 'học bài', description: 'học express route', id: 10 },
      { name: 'Tập thể dục', description: 'chạy 5 cây số', id: 11 },
      { name: 'Đọc sách', description: 'bạn ko thông minh lắm đâu', id: 12 },
      { name: 'Chơi game', description: 'đánh cờ nhân phẩm', id: 13 },
      { name: 'Làm việc nhà', description: 'Lau nhà, dọn phòng', id: 14 },
      { name: 'tập chơi đàn', description: 'luyện ngón', id: 15 },
    ];
    return { todos };
  }

  genId(todos: todo[]): number {
    return todos.length > 0
      ? Math.max(...todos.map((todo) => todo.id)) + 1
      : 11;
  }
  constructor() {}
}
