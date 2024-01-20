import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppStoreService } from '../../../../core/services/appStore.service';
import { TaskT } from '../../../types/task';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [DropdownComponent, ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent implements OnInit {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Input({ required: true }) taskColumnId!: string;

  private readonly appServiceStore = inject(AppStoreService);

  readonly taskColumnsList = this.appServiceStore.taskColumns();

  taskFormGroup = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    about: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    subTasks: new FormArray<FormControl<string>>([]),
    status: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.taskFormGroup.patchValue({ status: this.taskColumnId });
  }

  closeModal() {
    this.closeEvent.emit();
  }

  addSubTaskFormControl() {
    const control = new FormControl<string>('', { nonNullable: true });
    this.taskFormGroup.controls.subTasks.push(control);
  }

  deleteASubTaskForm(index: number) {
    this.taskFormGroup.controls.subTasks.removeAt(index);
  }
  addTask() {
    if (this.taskFormGroup.value && this.taskFormGroup.value.status) {
      const task: Omit<TaskT, 'id'> = {
        title: this.taskFormGroup.value?.title ?? '',
        about: this.taskFormGroup.value?.about ?? '',
        status: this.taskFormGroup.value.status,
        subTasks: this.taskFormGroup.value?.subTasks ?? [],
      };
      this.appServiceStore.addTaskToStore(
        this.taskFormGroup.value.status,
        task
      );
      this.closeModal();
    }
  }
}
