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
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fail if @Input() is not provided', () => {
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should pass if @Input() is provided', () => {
    component.task = taskColumnData.tasks[0];
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
