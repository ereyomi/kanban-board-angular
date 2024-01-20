import { Component, Input, signal } from '@angular/core';
import { TaskT } from '../../types/task';
import { ViewTaskModalComponent } from '../view-task-modal/view-task-modal.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ViewTaskModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  
  @Input({ required: true }) task!: TaskT;

  openViewTaskModal = signal<boolean>(false);

  openModal() {
    this.openViewTaskModal.set(true);
  }

  closeModal() {
    this.openViewTaskModal.set(false);
  }
}
