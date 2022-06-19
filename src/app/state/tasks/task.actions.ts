import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/Task';


//TODO: Export single object
export const addTask = createAction(
  '[Task Page] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task Page] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task Page] Delete Task',
  props<{ id: String }>()
);

export const loadTasks = createAction('[Task Page] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task API] Task Load Success',
  props<{ tasks: Task[] }>()
);

export const apiFailure = createAction(
  '[Tasks API] Tasks API Failure',
  props<{ error: string }>()
);