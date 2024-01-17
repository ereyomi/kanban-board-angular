import { Component } from '@angular/core';
import { TaskListComponent } from '../shared/ui/task-list/task-list.component';
import { TaskColumnModalComponent } from '../shared/ui/task-column-modal/task-column-modal.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TaskListComponent, TaskColumnModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
