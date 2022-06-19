import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CompletedTaskState } from './completed-task.reducer';


export const completedTasksStateSelector = (state: AppState) => state.completedTasks;

export const selectCharacterCompletedTasks = (characterId: String) => createSelector(
    completedTasksStateSelector,
    (state: CompletedTaskState) => {
        return state.completedTasks.filter(ct => ct.character == characterId)
    }
);

export const selectCompletedTaskStateStatus = createSelector(
    completedTasksStateSelector,
    (state: CompletedTaskState) => state.status
)