import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/models/Character';

export const addCharacter = createAction(
  '[Character Page] Add Character',
  props<{ character: Character }>()
);

export const updateCharacter = createAction(
  '[Character Page] Update Character',
  props<{ character: Character }>()
);

export const deleteCharacter = createAction(
  '[Character Page] Delete Character',
  props<{ id: String }>()
);

export const loadCharacters = createAction('[Character Page] Load Characters');

export const loadCharactersSuccess = createAction(
  '[Character API] Character Load Success',
  props<{ characters: Character[] }>()
);

export const loadCharactersFailure = createAction(
  '[Characters API] Characters Load Failure',
  props<{ error: string }>()
);