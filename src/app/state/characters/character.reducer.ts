import { createReducer, on } from '@ngrx/store';
import { Character } from 'src/app/models/Character';
import { addCharacter, deleteCharacter, loadCharacters, loadCharactersSuccess, loadCharactersFailure, updateCharacter } from './character.actions';

export interface CharacterState {
  characters: Character[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CharacterState = {
  characters: [],
  error: null,
  status: 'pending',
};

export const characterReducer = createReducer(
  
    // Supply the initial state
  initialState,
  
  // Add the new character to the characters array
  on(addCharacter, (state, { character }) => ({
    ...state,
    characters: [...state.characters, character],
  })),
  
  // Update character in the character array
  on(updateCharacter, (state, { character }) => ({
    ...state,
    characters:  state.characters.map(char => char._id == character._id ? character : char)
  })),

  // Remove the character from the characters array
  on(deleteCharacter, (state, { id }) => ({
    ...state,
    characters: state.characters.filter((character) => character._id !== id),
  })),
  
  // Trigger loading the characters
  on(loadCharacters, (state) => ({ ...state, status: 'loading' })),

  // Handle successfully loaded characters
  on(loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters: characters,
    error: null,
    status: 'success',
  })),

  // Handle characters load failure
  on(loadCharactersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);