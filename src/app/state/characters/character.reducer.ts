import { createReducer, on } from '@ngrx/store';
import { Character } from 'src/app/models/Character';
import {
  addCharacter,
  deleteCharacter,
  loadCharacters,
  loadCharactersSuccess,
  apiFailure,
  updateCharacter,
  hideTask,
  updateTaskPriorities
} from './character.actions';

export interface CharacterState {
  characters: Character[];
  error: String;
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
  on(addCharacter, (state) => ({ ...state, status: 'loading' })),

  on(updateCharacter, (state) => ({ ...state, status: 'loading' })),

  on(deleteCharacter, (state) => ({ ...state, status: 'loading' })),

  on(loadCharacters, (state) => ({ ...state, status: 'loading' })),

  // Handle successfully loaded characters
  on(loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters: characters,
    error: null,
    status: 'success',
  })),

  on(apiFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(hideTask, (state, { characterId, taskId, hidden }) => {

    let character: Character = state.characters.find(char => char._id == characterId);

    let characterClone: Character = { ...character };
    characterClone.configuration = { ...character.configuration };
    characterClone.configuration.tasks = [...characterClone.configuration.tasks];

    if(characterClone.configuration.tasks.some(taskConfig => taskConfig.task == taskId))
    {
      characterClone.configuration.tasks = characterClone.configuration.tasks.map(taskConfig => taskConfig.task == taskId ? { ...taskConfig, hidden: hidden } : taskConfig);
    }
    else{
      characterClone.configuration.tasks.push({
        hidden: hidden,
        task: taskId,
        priority: null
      });
    }

    return {
      ...state,
      characters: state.characters.map(c => c._id == character._id ? characterClone : c)
    };

  }),

  on(updateTaskPriorities, (state, { characterId, tasks }) => {

    let character: Character = state.characters.find(char => char._id == characterId);

    let characterClone: Character = { ...character };
    characterClone.configuration = { ...character.configuration };
    characterClone.configuration.tasks = [...characterClone.configuration.tasks];

    tasks.map((task, newPriority )=> {
      if(characterClone.configuration.tasks.some(config => config.task == task._id))
      {
        characterClone.configuration.tasks = characterClone.configuration.tasks.map(config => config.task == task._id ? { ...config, priority: newPriority } : config);
      }
      else
      {
        characterClone.configuration.tasks.push({
          hidden: false,
          task: task._id,
          priority: newPriority
        });
      }
    });

    return {
      ...state,
      characters: state.characters.map(c => c._id == character._id ? characterClone : c)
    };
  })

);