import { Component } from '@angular/core';
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
  openAddColumnModal = false;

  openColumnModal() {
    this.openAddColumnModal = true;
  }
  closeColumnModal() {
    this.openAddColumnModal = false;
  }
}
