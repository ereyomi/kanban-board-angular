import { Component, signal } from '@angular/core';
import { TaskListComponent } from '../core/components/task-list/task-list.component';
import { TaskColumnModalComponent } from '../core/components/task-column-modal/task-column-modal.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TaskListComponent, TaskColumnModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  openAddColumnModal = signal<boolean>(false);

  openColumnModal() {
    this.openAddColumnModal.set(true);
  }
  closeColumnModal() {
    this.openAddColumnModal.set(false);
  }
}
