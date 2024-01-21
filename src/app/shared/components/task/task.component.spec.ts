import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TaskStatusColumnT } from '../../types/task';

const taskColumnData: TaskStatusColumnT = {
  id: 'todo-uuid',
  label: 'Todo',
  tasks: [
    {
      id: 'ffgfg-dsdsdsd-sdsd-sdsds',
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
};

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
