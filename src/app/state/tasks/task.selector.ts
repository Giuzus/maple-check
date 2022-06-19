import { createSelector } from '@ngrx/store';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { AppState } from '../app.state';
import { selectCharacter } from '../characters/character.selector';
import { selectCharacterCompletedTasks } from '../completedTasks/completed-task.selector';
import { TaskState } from './task.reducer';
import * as _ from 'lodash';

export const tasksStateSelector = (state: AppState) => state.tasks;

export const allTasks = createSelector(
    tasksStateSelector,
    (state: TaskState) => state.tasks
);

export const selectCharacterTasks = (characterId: String, type: String, repeats: String) => createSelector(
    tasksStateSelector,
    selectCharacterCompletedTasks(characterId),
    selectCharacter(characterId),
    (state: TaskState, completedTasks: CompletedTask[], character: Character) => {

        let tasks = state.tasks
            .filter(task => task.type == type && task.repeats == repeats)
            .map(task => {
                task = { ...task }
                task.hidden = character?.configuration?.tasks.some(t => t.task == task._id && t.hidden);
                task.priority = character?.configuration?.tasks.findIndex(t => t.task == task._id);
                task.complete = completedTasks?.some(completed => completed.task == task._id);
                return task;
            });

        //Order by priority
        return _.orderBy(tasks, ['priority'], ['asc']);;
    }
);

export const selectTask = (id: String) => createSelector(
    tasksStateSelector,
    (state: TaskState) => state.tasks.find(task => task._id == id)
)

export const selectTaskStateStatus = createSelector(
    tasksStateSelector,
    (state: TaskState) => state.status
)