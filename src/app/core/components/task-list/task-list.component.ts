import { Component, signal } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent, AddTaskModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  openAddTaskModal = signal<boolean>(false)

  openModal() {
    this.openAddTaskModal.set(true)
  }
  closeModal() {
    this.openAddTaskModal.set(false)
  }
}