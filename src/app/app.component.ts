import { Component, HostBinding, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppStoreService } from './core/services/appStore.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly appServiceStore = inject(AppStoreService);
  title = 'kanban-p';

  ngOnInit(): void {
    const perstData = localStorage.getItem('taskStore');
    console.log(perstData);
    this.appServiceStore.setStore(perstData ? JSON.parse(perstData) : []);
  }
}
