import { Component, inject, signal } from '@angular/core';
import { TaskListComponent } from '../shared/components/task-list/task-list.component';
import { TaskStatusModalComponent } from '../shared/components/task-column-modal/task-status-modal.component';
import { AppStoreService } from '../core/services/appStore.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TaskListComponent, TaskStatusModalComponent, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly appServiceStore = inject(AppStoreService);

  readonly storeData = this.appServiceStore.taskStoreData();

  constructor() {}

  openAddColumnModal = signal<boolean>(false);

  openColumnModal() {
    this.openAddColumnModal.set(true);
  }
  closeColumnModal() {
    this.openAddColumnModal.set(false);
  }
}
