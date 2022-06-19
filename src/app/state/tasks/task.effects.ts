import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { addTask, deleteTask, loadTasks, apiFailure, loadTasksSuccess, updateTask } from './task.actions';
import { TaskService } from 'src/app/services/task/task.service';

@Injectable()
export class TaskEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private taskService: TaskService
    ) { }

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTasks),
            switchMap(() =>
                from(this.taskService.getTasks()).pipe(
                    // Take the returned value and return a new success action containing the characters
                    map((tasks) => loadTasksSuccess({ tasks: tasks })),
                    // Or... if it errors return a new failure action containing the error
                    catchError((error) => of(apiFailure({ error })))
                )
            )
        )
    );

    saveTask$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addTask),
                switchMap(action =>
                    from(this.taskService.create(action.task)).pipe(
                        map(() => loadTasks()),
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );

    updateTask$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateTask),
                switchMap(action =>
                    from(this.taskService.update(action.task)).pipe(
                        map(() => loadTasks()),
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );

    deleteTask$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deleteTask),
                switchMap(action =>
                    from(this.taskService.delete(action.id)).pipe(
                        map(() => loadTasks()),
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );

}