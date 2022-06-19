import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/Task';
import { addTask, deleteTask, loadTasks, loadTasksSuccess, apiFailure, updateTask } from './task.actions';

export interface TaskState {
  tasks: Task[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
  status: 'pending',
};

export const taskReducer = createReducer(
  
    // Supply the initial state
  initialState,
  
  on(addTask, (state) => ({ ...state, status: 'loading' })),
  
  on(updateTask, (state) => ({ ...state, status: 'loading' })),

  on(deleteTask, (state) => ({ ...state, status: 'loading' })),
  
  on(loadTasks, (state) => ({ ...state, status: 'loading' })),

  // Handle successfully loaded tasks
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    error: null,
    status: 'success',
  })),

  // Handle tasks load failure
  on(apiFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);