import { FormArray, FormControl } from '@angular/forms';
export type TaskT = {
  id: string;
  title: string;
  about: string;
  subTasks: string[];
  status: string;
};

export type TaskStoreT = {
  id: string;
  label: string;
  tasks: TaskT[];
};
