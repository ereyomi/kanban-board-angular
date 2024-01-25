import { TestBed } from '@angular/core/testing';

import { AppStoreService } from './appStore.service';
import { CreateTask } from '../../shared/types/task';

describe('AppStoreService', () => {
  let service: AppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Task Column', () => {
    service.addTaskStatusColumn('Todo');
    expect(service.taskColumnLabelExist('Todo')).toBe(true);
  });

  it('should add Task Column', () => {
    service.addTaskStatusColumn('Todo');
    expect(service.taskStoreData().length).toBe(1);
    expect(service.taskStoreData()[0].label).toBe('Todo');
    expect(service.taskStoreData()[0].tasks.length).not.toBe(1);
    // create task
    const newTaskData: CreateTask = {
      title: 'Cook Rice',
      about: 'I intend to eat soon',
      subTasks: ['Turn on the gas', 'Place the pot on fire'],
    };
    service.addTaskToStore(service.taskStoreData()[0].id, newTaskData);
    expect(service.taskStoreData()[0].tasks.length).toBe(1);
    expect(service.taskStoreData()[0].tasks[0].title).toBe(newTaskData.title);
  });
});
