import { Component, Input, signal } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TaskStatusColumnT } from '../../types/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent, AddTaskModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input({ required: true }) taskColumn!: TaskStatusColumnT;

  openAddTaskModal = signal<boolean>(false);

  openModal() {
    this.openAddTaskModal.set(true);
  }
  closeModal() {
    this.openAddTaskModal.set(false);
  }
}
