import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskModalComponent } from './view-task-modal.component';
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

describe('ViewTaskModalComponent', () => {
  let component: ViewTaskModalComponent;
  let fixture: ComponentFixture<ViewTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskModalComponent);
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
