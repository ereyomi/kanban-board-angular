import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppStoreService } from '../../services/appStore.service';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [DropdownComponent, ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  private readonly appServiceStore = inject(AppStoreService);

  taskFormGroup = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true }),
    about: new FormControl<string>('', { nonNullable: true }),
    subTasks: new FormArray<FormControl<string>>([]),
    status: new FormControl<string>('', { nonNullable: true }),
  });

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
    console.log(this.taskFormGroup.value);
  }
}
