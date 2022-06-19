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

export const loadCharacters = createAction('[Character API] Load Characters');

export const loadCharactersSuccess = createAction(
  '[Character API] Character Load Success',
  props<{ characters: Character[] }>()
);

export const apiFailure = createAction(
  '[Characters API] API Failure',
  props<{ error: string }>()
);


export const hideTask = createAction(
  '[Home] hide task',
  props<{ characterId: String, taskId: String, hidden: Boolean }>()
);