import { Injectable, Signal, computed, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CreateTask, TaskStatusColumnT, TaskT } from '../../shared/types/task';
import { SelectOptionT } from '../../shared/types/Select';
@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private taskStore = signal<TaskStatusColumnT[]>([]);

  taskStatusColumns: Signal<SelectOptionT[]> = computed(() =>
    this.taskStore().map((v) => ({ id: v.id, label: v.label }))
  );

  constructor() {}

  get taskStoreData() {
    return this.taskStore.asReadonly();
  }

  setStore(data: TaskStatusColumnT[]) {
    this.taskStore.update(v => data);
  }

  taskColumnLabelExist(label: string) {
    return this.taskStatusColumns().some(
      (task) => task.label.trim().toLowerCase() === label.trim().toLowerCase()
    );
  }

  addTaskStatusColumn(label: string) {
    const taskStatusColumnData: TaskStatusColumnT = {
      id: uuidv4(),
      label,
      tasks: [],
    };
    this.taskStore.update((v) => [...v, taskStatusColumnData]);
    localStorage.setItem('taskStore', JSON.stringify(this.taskStore()));
  }

  // Add a new task to a specific task store
  addTaskToStore(statusId: string, newTask: CreateTask): void {
    console.log('addTaskToStore:::', newTask, statusId, this.taskStore());
    this.taskStore.update((v) =>
      v.map((store) => {
        if (store.id === statusId) {
          console.log('statusId:::', store.id, statusId, this.taskStore());
          return {
            ...store,
            tasks: [
              ...store.tasks,
              {
                title: newTask.title,
                about: newTask.about,
                statusId,
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
    console.log('taskStore:::', statusId, this.taskStore());
  }

  updateTask(statusId: string, pTask: TaskT): void {
    this.taskStore.update((v) =>
      v.map((sc) => {
        if (sc.id === statusId) {
          return {
            ...sc,
            tasks: sc.tasks.map((task) => {
              if (task.id === pTask.id) {
                return pTask;
              }
              return task;
            }),
          };
        }
        return sc;
      })
    );
  }

  changeTaskStatus(
    oldStatusId: string,
    newStatusId: string,
    task: TaskT
  ): void {
    if (oldStatusId !== newStatusId) {
      this.taskStore.update((v) =>
        v.map((sc) => {
          if (sc.id === oldStatusId) {
            return {
              ...sc,
              tasks: sc.tasks.filter((f) => f.id !== task.id),
            };
          }
          if (sc.id === newStatusId) {
            return {
              ...sc,
              tasks: [...sc.tasks, { ...task, statusId: newStatusId }],
            };
          } else {
            return sc;
          }
        })
      );
    }
  }
}
