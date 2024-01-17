import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColumnModalComponent } from './task-column-modal.component';

describe('TaskColumnModalComponent', () => {
  let component: TaskColumnModalComponent;
  let fixture: ComponentFixture<TaskColumnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskColumnModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskColumnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
