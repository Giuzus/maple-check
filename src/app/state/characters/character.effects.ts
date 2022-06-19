import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CharacterService } from 'src/app/services/character/character.service';
import { addCharacter, deleteCharacter, hideTask, loadCharacters, apiFailure, loadCharactersSuccess, updateCharacter } from './character.actions';

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
                    // Take the returned value and return a new success action containing the characters
                    map((characters) => loadCharactersSuccess({ characters: characters })),
                    // Or... if it errors return a new failure action containing the error
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
                        // Take the returned value and return a new success action containing the characters
                        map(() => loadCharacters()),
                        // Or... if it errors return a new failure action containing the error
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
                        // Take the returned value and return a new success action containing the characters
                        map(() => loadCharacters()),
                        // Or... if it errors return a new failure action containing the error
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
                        // Take the returned value and return a new success action containing the characters
                        map(() => loadCharacters()),
                        // Or... if it errors return a new failure action containing the error
                        catchError((error) => of(apiFailure({ error })))
                    )
                )
            )
    );
}