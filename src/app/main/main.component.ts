import { Component } from '@angular/core';
import { TaskListComponent } from '../shared/ui/task-list/task-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
