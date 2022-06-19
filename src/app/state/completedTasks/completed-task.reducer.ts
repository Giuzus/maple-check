import { createReducer, on } from '@ngrx/store';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { loadCompletedTasks, loadCompletedTasksFailure, loadCompletedTasksSuccess, setComplete, setIncomplete } from './completed-task.actions';

export interface CompletedTaskState {
  completedTasks: CompletedTask[];
  error: String;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CompletedTaskState = {
  completedTasks: [],
  error: null,
  status: 'pending',
};

export const completedTaskReducer = createReducer(
  initialState,

  on(setComplete, (state, { characterId, taskId }) => {

    let completedTask: CompletedTask = {
      _id: "",
      task: taskId,
      character: characterId,
      date: new Date()
    }

    return {
      ...state,
      completedTasks: [...state.completedTasks, completedTask],
    }
  }),

  on(setIncomplete, (state, { characterId, taskId }) => ({
    ...state,
    completedTasks: state.completedTasks.filter(ct => !(ct.character == characterId && ct.task == taskId))
  })),

  on(loadCompletedTasks, (state) => ({ ...state, status: 'loading' })),

  on(loadCompletedTasksSuccess, (state, { completedTasks }) => ({
    ...state,
    completedTasks: completedTasks,
    error: null,
    status: 'success',
  })),

  //TODO: make default handler?
  on(loadCompletedTasksFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);