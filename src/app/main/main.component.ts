import { Component, effect, inject, signal } from '@angular/core';
import { TaskListComponent } from '../core/components/task-list/task-list.component';
import { TaskColumnModalComponent } from '../core/components/task-column-modal/task-column-modal.component';
import { AppStoreService } from '../core/services/appStore.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TaskListComponent, TaskColumnModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly appServiceStore = inject(AppStoreService);

  readonly storeData = this.appServiceStore.storeData();

  constructor() {
    effect(() => {
      // console.log('store', this.appServiceStore.store());
      console.log('here', this.storeData());
    });
  }

  openAddColumnModal = signal<boolean>(false);

  openColumnModal() {
    this.openAddColumnModal.set(true);
  }
  closeColumnModal() {
    this.openAddColumnModal.set(false);
  }
}
