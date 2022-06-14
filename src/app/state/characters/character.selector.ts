import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CharacterState } from './character.reducer';


export const charactersStateSelector = (state: AppState) => state.characters;

export const selectAllCharacters = createSelector(
    charactersStateSelector,
    (state: CharacterState) => state.characters
);

export const selectCharacter = (id: String) => createSelector(
    charactersStateSelector,
    (state: CharacterState) => state.characters.find(character => character._id == id)
)

export const selectCharacterStateStatus = createSelector(
    charactersStateSelector,
    (state: CharacterState) => state.status
)