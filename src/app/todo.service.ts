import { todo } from './todo.model';
import { Injectable } from '@angular/core';
import { TODOS } from './mock-todos';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private todosUrl = 'api/todos';
  constructor(private messages: MessageService, private http: HttpClient) {}
  getTodos(): Observable<todo[]> {
    return this.http.get<todo[]>(this.todosUrl).pipe(
      tap((_) => this.messages.add('TodoService: fetched data')),
      catchError(this.handleError<todo[]>('getTodos', []))
    );
  }
  getTodo(id: Number): Observable<todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<todo>(url).pipe(
      tap((_) => this.messages.add(`TodoService, fetched todo id=${id}`)),
      catchError(this.handleError<todo>(`getTodo id=${id}`))
    );
  }

  updateTodo(todo: todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap((_) => this.messages.add(`updateTodo id=${todo.id}`)),
      catchError(this.handleError<any>('update Todo'))
    );
  }

  addTodo(todo: todo): Observable<todo> {
    return this.http.post<todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: todo) => this.messages.add(`added todo id=${newTodo.id}`)),
      catchError(this.handleError<todo>('add Todo'))
    );
  }

  deleteTodo(id: number): Observable<todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<todo>(url, this.httpOptions).pipe(
      tap((_) => this.messages.add(`delete todo id=${id}`)),
      catchError(this.handleError<todo>('delete todo'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messages.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
