import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [DropdownComponent, ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {

  

  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  closeModal() {
    this.closeEvent.emit();
  }
}
