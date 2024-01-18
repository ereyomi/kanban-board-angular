import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskStoreT } from '../types/task';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  store = signal<Record<string, TaskStoreT>>({});

  constructor() {}

  addTaskColumn(label: string) {
    const taskColumnData: TaskStoreT = {
      id: uuidv4(),
      label,
      tasks: [],
    };
    this.store.update((v) => ({
      ...v,
      [taskColumnData.id]: taskColumnData,
    }));
  }
}
