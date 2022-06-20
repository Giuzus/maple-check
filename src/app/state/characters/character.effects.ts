import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CharacterService } from 'src/app/services/character/character.service';
import { addCharacter, deleteCharacter, loadCharacters, apiFailure, loadCharactersSuccess, updateCharacter, hideTask, updateTaskPriorities } from './character.actions';
import { selectCharacter } from './character.selector';

@Injectable()
export class CharacterEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private characterService: CharacterService
    ) { }

    // Run this code when a loadCharacters action is dispatched
    loadCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCharacters),
            switchMap(() =>
                // Call the getCharacters method, convert it to an observable
                from(this.characterService.getAll()).pipe(
                    map((characters) => loadCharactersSuccess({ characters: characters })),
                    catchError((error) => of(apiFailure({ error })))
                )
            )
        )
    );

    // Run this code when the addCharacter action is dispatched
    saveCharacter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addCharacter),
                switchMap(action =>
                    from(this.characterService.create(action.character)).pipe(
                        map(() => loadCharacters()),
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );

    // Run this code when the updateCharacter action is dispatched
    updateCharacter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateCharacter),
                switchMap(action =>
                    from(this.characterService.update(action.character)).pipe(
                        map(() => loadCharacters()),
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );

    // Run this code when the updateCharacter action is dispatched
    deleteCharacter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deleteCharacter),
                switchMap(action =>
                    from(this.characterService.delete(action.id)).pipe(
                        map(() => loadCharacters()),
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );

    // Run this code when the hideTask action is dispatched
    configurationChanged$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(hideTask, updateTaskPriorities),
                switchMap(action =>
                    of(action).pipe(
                        withLatestFrom(this.store.select(selectCharacter(action.characterId))),
                        switchMap(([action,latest]) => from(this.characterService.update(latest)))
                    )
                ),
            ),
        { dispatch: false }
    );
}