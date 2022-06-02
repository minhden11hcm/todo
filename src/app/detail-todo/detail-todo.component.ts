import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Location } from '@angular/common';
import { todo } from '../todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss'],
})
export class DetailTodoComponent implements OnInit {
  todoForm!: FormGroup;
  todo!: todo;
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe((todo) => (this.todo = todo));
  }
  goBack(): void {
    this.location.back();
  }

  update(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoForm.value.id = id;
    this.todo = this.todoForm.value as todo;
    this.todoService
      .updateTodo(this.todo)
      .subscribe(() => this.location.back());
  }

  ngOnInit(): void {
    this.getTodo();
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
}
