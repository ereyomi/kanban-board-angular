import { Injectable, Signal, computed, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateTask,
  TaskStatusColumnT,
  TaskT,
} from '../../shared/types/task';
import { SelectOptionT } from '../../shared/types/Select';
@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private taskStore = signal<TaskStatusColumnT[]>([
    {
      id: 'todo-uuid',
      label: 'Todo',
      tasks: [
        {
          id: uuidv4(),
          title: 'Building kanban app',
          about: 'Empowing project manages build wonderful projects',
          statusId: 'todo-uuid',
          subTasks: [
            {
              id: 'dsdsds',
              label: 'Moving pending tasks',
              done: true,
            },
            {
              id: 'fffsdsds',
              label: 'Moving tasks to done done',
              done: false,
            },
          ],
        },
      ],
    },
  ]);

  taskStatusColumns: Signal<SelectOptionT[]> = computed(() =>
    this.taskStore().map((v) => ({ id: v.id, label: v.label }))
  );

  constructor() {}

  taskStoreData() {
    return this.taskStore.asReadonly();
  }

  addTaskStatusColumn(label: string) {
    const taskStatusColumnData: TaskStatusColumnT = {
      id: uuidv4(),
      label,
      tasks: [],
    };
    this.taskStore.update((v) => [...v, taskStatusColumnData]);
  }

  // Add a new task to a specific task store
  addTaskToStore(statusId: string, newTask: CreateTask): void {
    this.taskStore.update((v) =>
      v.map((store) => {
        if (store.id === statusId) {
          return {
            ...store,
            tasks: [
              ...store.tasks,
              {
                ...newTask,
                statusId: statusId,
                id: uuidv4(),
                subTasks: newTask.subTasks.map((l) => ({
                  id: uuidv4(),
                  label: l,
                  done: false,
                })),
              },
            ],
          };
        }
        return store;
      })
    );
  }

  updateTask(statusId: string, taskId: string, pTask: Partial<TaskT>): void {
    this.taskStore.update((v) =>
      v.map((sc) => {
        if (sc.id === statusId) {
          return {
            ...sc,
            tasks: sc.tasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  ...pTask,
                };
              }
              return task;
            }),
          };
        }
        return sc;
      })
    );
  }

  findTask(predicate: (task: TaskT) => boolean): TaskT | undefined {
    const taskStores = this.taskStore();
    for (const taskStatus of taskStores) {
      const foundTask = taskStatus.tasks.find(predicate);
      if (foundTask) {
        return foundTask;
      }
    }
    return undefined;
  }

  getTaskStore(statusId: string): TaskStatusColumnT | undefined {
    return this.taskStore().find((s) => s.id === statusId);
  }

  getTaskStoreName(statusId: string): string {
    return this.getTaskStore(statusId)?.label ?? '';
  }

  getTask(storeId: string, taskId: string): TaskT | undefined {
    const taskStore = this.taskStore().find((s) => s.id === storeId);
    return taskStore?.tasks.find((task) => task.id === taskId);
  }
}
