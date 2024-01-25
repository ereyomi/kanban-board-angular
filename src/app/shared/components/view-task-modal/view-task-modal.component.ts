import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ModalComponent } from '../../ui/modal/modal.component';
import { SubTask, TaskT } from '../../types/task';
import { AppStoreService } from '../../../core/services/appStore.service';
import { NgClass } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-task-modal',
  standalone: true,
  imports: [ModalComponent, NgClass, DropdownComponent, ReactiveFormsModule],
  templateUrl: './view-task-modal.component.html',
  styleUrl: './view-task-modal.component.scss',
})
export class ViewTaskModalComponent implements OnInit, OnDestroy {
  private readonly appServiceStore = inject(AppStoreService);
  readonly taskColumnsList = this.appServiceStore.taskStatusColumns();
  private _task!: TaskT;
  doneSubTask = 0;

  statusIdFormControl = new FormControl('', Validators.required);

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  @Input({ required: true }) set task(d: TaskT) {
    this._task = d;
    this.doneSubTask = d.subTasks.filter((v) => v.done).length;
  }

  get task() {
    return this._task;
  }

  ngOnInit(): void {
    this.statusIdFormControl.setValue(this._task.statusId);
  }

  closeModal() {
    this.closeEvent.emit();
  }

  updateSubTask(subTask: SubTask) {
    const tk: TaskT = {
      ...this._task,
      subTasks: this._task.subTasks.map((v) => {
        if (v.id === subTask.id) {
          return {
            ...subTask,
            done: !subTask.done,
          };
        }
        return v;
      }),
    };
    this.appServiceStore.updateTask(this.task.statusId, tk);
  }

  ngOnDestroy(): void {
    if (this.statusIdFormControl.value) {
      this.appServiceStore.changeTaskStatus(
        this.task.statusId,
        this.statusIdFormControl.value,
        {
          ...this._task,
          statusId: this.statusIdFormControl.value,
        }
      );
    }
  }
}
