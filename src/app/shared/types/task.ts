export type TaskT = {
  id: string;
  title: string;
  about: string;
  subTasks: string[];
  status: string;
};

export type TaskSColumnT = {
  id: string;
  label: string;
  tasks: TaskT[];
};
