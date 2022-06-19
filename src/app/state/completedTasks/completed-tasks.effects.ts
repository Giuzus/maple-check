import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task/task.service';
import { AppState } from '../app.state';
import { loadCompletedTasks, loadCompletedTasksFailure, loadCompletedTasksSuccess, setComplete, setIncomplete } from './completed-task.actions';

@Injectable()
export class CompletedTaskEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private taskService: TaskService
    ) { }

    setIncomplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setIncomplete),
            map((action) => this.taskService.changeTaskState(action.characterId,action.taskId, false))
        ),
        {
            dispatch: false
        }
    );
    
    setComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setComplete),
            map((action) => this.taskService.changeTaskState(action.characterId,action.taskId, true))
        ),
        {
            dispatch: false
        }
    );

    loadCompletedTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCompletedTasks),
            switchMap(() =>
                from(this.taskService.getCompletedTasks()).pipe(
                    map((completedTasks) => loadCompletedTasksSuccess({ completedTasks })),
                    catchError((error) => of(loadCompletedTasksFailure({ error })))
                )
            )
        )
    );
}