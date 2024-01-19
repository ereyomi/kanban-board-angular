import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskSColumnT, TaskT } from '../types/task';
@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private store = signal<TaskSColumnT[]>([
    {
      id: uuidv4(),
      label: 'Todo',
      tasks: [],
    },
  ]);

  constructor() {}

  storeData() {
    return this.store.asReadonly();
  }

  addTaskColumn(label: string) {
    const taskColumnData: TaskSColumnT = {
      id: uuidv4(),
      label,
      tasks: [],
    };
    this.store.update((v) => [...v, taskColumnData]);
  }

  // Add a new task to a specific task store
  addTaskToStore(storeId: string, task: TaskT): void {
    this.store.update((v) =>
      v.map((store) => {
        if (store.id === storeId) {
          return {
            ...store,
            tasks: [...store.tasks, task],
          };
        }
        return store;
      })
    );
  }
  updateTaskStatus(storeId: string, taskId: string, newStatus: string): void {
    this.store.update((v) =>
      v.map((store) => {
        if (store.id === storeId) {
          return {
            ...store,
            tasks: store.tasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  status: newStatus,
                };
              }
              return task;
            }),
          };
        }
        return store;
      })
    );
  }

  getTaskStore(storeId: string): TaskSColumnT | undefined {
    return this.store().find((store) => store.id === storeId);
  }

  getTask(storeId: string, taskId: string): TaskT | undefined {
    const taskStore = this.store().find((store) => store.id === storeId);
    return taskStore?.tasks.find((task) => task.id === taskId);
  }
}
