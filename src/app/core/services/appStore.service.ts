import { Injectable, Signal, computed, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CreateTask, TaskStatusColumnT, TaskT } from '../../shared/types/task';
import { SelectOptionT } from '../../shared/types/Select';
@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private taskStore = signal<TaskStatusColumnT[]>([
   /*  {
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
    }, */
    /* {
      id: 'in-progress',
      label: 'In Progress',
      tasks: [
        {
          id: uuidv4(),
          title: 'Building in progress kanban app',
          about: 'Empowing project manages build wonderful projects',
          statusId: 'in-progress',
          subTasks: [
            {
              id: 'dsdsdxdfds',
              label: 'Moving pending tasks',
              done: true,
            },
            {
              id: 'ffdfdfdfsdsds',
              label: 'Moving tasks to done done',
              done: false,
            },
          ],
        },
      ],
    }, */
  ]);

  taskStatusColumns: Signal<SelectOptionT[]> = computed(() =>
    this.taskStore().map((v) => ({ id: v.id, label: v.label }))
  );

  constructor() {}

  taskStoreData() {
    return this.taskStore.asReadonly();
  }

  taskColumnLabelExist(label: string) {
    return this.taskStatusColumns().some(task => task.label.trim().toLowerCase() === label.trim().toLowerCase())
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
