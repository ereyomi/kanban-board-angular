import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-column-modal',
  standalone: true,
  imports: [],
  templateUrl: './task-column-modal.component.html',
  styleUrl: './task-column-modal.component.scss',
})
export class TaskColumnModalComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  closeModal() {
    this.closeEvent.emit();
  }
}
