import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  closeModal() {
    this.closeEvent.emit();
  }
}
