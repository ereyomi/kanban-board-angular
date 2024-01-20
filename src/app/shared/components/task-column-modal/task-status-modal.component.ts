import { JsonPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BadWordsValidator } from '../../Validator/bad-words';
import { ForbiddenCharactersValidator } from '../../Validator/forbidden';
import { AppStoreService } from '../../../core/services/appStore.service';
import { ModalComponent } from '../../ui/modal/modal.component';
@Component({
  selector: 'app-task-status-modal',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, NgClass, JsonPipe],
  templateUrl: './task-status-modal.component.html',
  styleUrl: './task-status-modal.component.scss',
})
export class TaskStatusModalComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  private appServiceStore = inject(AppStoreService);

  componentForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      BadWordsValidator(),
      ForbiddenCharactersValidator(),
    ],
  });

  closeModal() {
    this.closeEvent.emit();
  }

  addTaskColumn() {
    this.appServiceStore.addTaskStatusColumn(this.componentForm.value);
    this.closeModal();
  }
}
