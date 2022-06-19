import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task/task.service';
import { AppState } from '../app.state';
import { loadCompletedTasks, loadCompletedTasksFailure, loadCompletedTasksSuccess } from './completed-task.actions';

@Injectable()
export class CompletedTaskEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private taskService: TaskService
    ) { }

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