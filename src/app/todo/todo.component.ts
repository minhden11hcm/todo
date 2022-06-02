import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { todo } from '../todo.model';
import { MessageService } from '../message.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks: todo[] = [];
  todoForm!: FormGroup;
  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}
  getTodos(): void {
    this.todoService.getTodos().subscribe((tasks) => (this.tasks = tasks));
  }

  addTodo(): void {
    this.todoForm.value.name.trim();
    this.todoForm.value.description.trim();
    this.todoService.addTodo(this.todoForm.value as todo).subscribe((todo) => {
      this.todoForm.reset();
      return this.tasks.push(todo);
    });
  }

  deleteTodo(todo: todo): void {
    this.tasks = this.tasks.filter((task) => task !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getTodos();
  }
}
