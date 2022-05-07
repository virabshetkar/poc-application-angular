import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { HomeComponent } from './containers/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [
    TodoComponent,
    HomeComponent,
    NavbarComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
  ],
})
export class TodoModule {}
