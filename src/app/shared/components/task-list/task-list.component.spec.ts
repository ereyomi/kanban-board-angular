import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskStatusColumnT } from '../../types/task';
import { DebugElement } from '@angular/core';

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

const taskColumnDataB: TaskStatusColumnT = {
  id: 'in-progress-uuid',
  label: 'In Progress',
  tasks: [
    {
      id: 'ffgfg-dsdsdsd-sdsd-sdsds',
      title: 'Building kanban app',
      about: 'Empowing project manages build wonderful projects',
      statusId: 'todo-uuid',
      subTasks: [],
    },
  ],
};

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail if @Input() is not provided', () => {
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should pass if @Input() is provided', () => {
    component.taskColumn = taskColumnData;
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should have <p> with "Todo"', () => {
    component.taskColumn = taskColumnData;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement;
    const componentEl: HTMLElement = debugElement.nativeElement;
    const p = componentEl.querySelector('#taskLabel p')!;
    expect(p.textContent).toContain('Todo');
  });
});
