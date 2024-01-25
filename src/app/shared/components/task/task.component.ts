import { Component, Input, OnInit, signal } from '@angular/core';
import { TaskT } from '../../types/task';
import { ViewTaskModalComponent } from '../view-task-modal/view-task-modal.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ViewTaskModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input({ required: true }) task!: TaskT;

  openViewTaskModal = signal<boolean>(false);

  doneSubTask = 0;

  ngOnInit(): void {
    this.doneSubTask = this.task.subTasks.filter((v) => v.done).length;
  }

  openModal() {
    this.openViewTaskModal.set(true);
  }

  closeModal() {
    this.openViewTaskModal.set(false);
  }
}
