import { CharacterState } from "./characters/character.reducer";
import { CompletedTaskState } from "./completedTasks/completed-task.reducer";
import { TaskState } from "./tasks/task.reducer";


export interface AppState {
  characters: CharacterState;
  tasks: TaskState;
  completedTasks: CompletedTaskState
}