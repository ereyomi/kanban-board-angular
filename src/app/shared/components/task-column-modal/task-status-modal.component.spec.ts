import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusModalComponent } from './task-status-modal.component';

describe('TaskStatusModalComponent', () => {
  let component: TaskStatusModalComponent;
  let fixture: ComponentFixture<TaskStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
