import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { DetailTodoComponent } from './detail-todo/detail-todo.component';

const routes: Routes = [
  { path: 'mytodo', component: TodoComponent },
  { path: 'detail-todo/:id', component: DetailTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
