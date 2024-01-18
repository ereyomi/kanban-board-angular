import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-column-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './task-column-modal.component.html',
  styleUrl: './task-column-modal.component.scss',
})
export class TaskColumnModalComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();


  componentForm = new FormControl<string>('', { nonNullable: true, validators: [Validators.required], });

  closeModal() {
    this.closeEvent.emit();
  }

  addTaskColumn() {
    
  }
}
