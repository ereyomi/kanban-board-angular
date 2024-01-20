type Base = {
  id: string;
  label: string;
};

export type TaskStatusColumnT = Base & {
  tasks: TaskT[];
};

export type SubTask = Base & {
  done: boolean;
};

export type TaskT = {
  id: string;
  title: string;
  about: string;
  subTasks: SubTask[];
  statusId: string;
};

export type CreateTask = {
  title: string;
  about: string;
  subTasks: string[];
}
