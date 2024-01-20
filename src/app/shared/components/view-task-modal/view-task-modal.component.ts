import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { ModalComponent } from '../../ui/modal/modal.component';
import { SubTask, TaskT } from '../../types/task';
import { AppStoreService } from '../../../core/services/appStore.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-view-task-modal',
  standalone: true,
  imports: [ModalComponent, NgClass],
  templateUrl: './view-task-modal.component.html',
  styleUrl: './view-task-modal.component.scss',
})
export class ViewTaskModalComponent implements OnInit {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Input({ required: true }) task!: TaskT;

  statusLabel = signal<string>('');

  private readonly appServiceStore = inject(AppStoreService);

  ngOnInit(): void {
    console.log(this.task);
    this.statusLabel.set(
      this.appServiceStore.getTaskStoreName(this.task.statusId)
    );
  }

  closeModal() {
    this.closeEvent.emit();
  }
  
  updateSubTask(subTask: SubTask) {
    const n: TaskT = {
      ...this.task,
      subTasks: this.task.subTasks.map((v) => {
        if (v.id === subTask.id) {
          return {
            ...subTask,
            done: !subTask.done,
          };
        }
        return v;
      }),
    };
    console.log(n);
    this.appServiceStore.updateTask(this.task.statusId, this.task.id, n);
  }
}
