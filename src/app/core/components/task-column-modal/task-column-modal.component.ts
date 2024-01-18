import { JsonPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BadWordsValidator } from '../../Validator/bad-words';
import { ForbiddenCharactersValidator } from '../../Validator/forbidden';
import { AppStoreService } from '../../services/appStore.service';
@Component({
  selector: 'app-task-column-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './task-column-modal.component.html',
  styleUrl: './task-column-modal.component.scss',
})
export class TaskColumnModalComponent {
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
    this.appServiceStore.addTaskColumn(this.componentForm.value);
    this.closeModal();
  }
}
