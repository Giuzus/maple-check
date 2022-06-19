import { createAction, props } from '@ngrx/store';
import { CompletedTask } from 'src/app/models/CoompletedTask';

export const setComplete = createAction(
  '[Completed Task] Set complete',
  props<{ characterId: String, taskId: String }>()
);

export const setIncomplete = createAction(
  '[Completed Task] Set incomplete',
  props<{ characterId: String, taskId: String }>()
);

export const loadCompletedTasks = createAction(
  '[Completed Task API] Load'
)

export const loadCompletedTasksSuccess = createAction(
  '[Completed Task API] Load success',
  props<{ completedTasks: CompletedTask[] }>()
)

export const loadCompletedTasksFailure = createAction(
  '[Completed Task API] Load failure',
  props<{ error: String }>()
)