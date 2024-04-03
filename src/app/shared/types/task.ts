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

// delete obj['statusId'];

/*
type m = Omit<TaskT, 'statusId'>

type p = Pick<TaskT, 'statusId' | 'subTasks'>


interface f {
  title: string;
}
interface c extends f  {

}
 */
