import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as arrayMove from 'array-move';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { Task } from 'src/app/models/Task';
import { updateTaskPriorities } from 'src/app/state/characters/character.actions';
import { selectCompletedTaskStateStatus } from 'src/app/state/completedTasks/completed-task.selector';
import { selectCharacterTasks, selectTaskStateStatus } from 'src/app/state/tasks/task.selector';

@Component({
  selector: 'app-character-task-list',
  templateUrl: './character-task-list.component.html',
  styleUrls: ['./character-task-list.component.scss']
})
export class CharacterTaskListComponent implements OnChanges {

  @Input() character: Character;
  @Input() label: String;

  @Input() type: String;
  @Input() repeats: String;

  tasks$: Observable<Task[]>;
  tasks: Task[];

  taskStateStatus$: Observable<String> = this.store.select(selectTaskStateStatus);
  completedTaskStateStatus$: Observable<String> = this.store.select(selectCompletedTaskStateStatus);

  editMode: Boolean;
  isCollapsed: boolean = false;

  constructor(private store: Store) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.tasks$ = this.store.select(selectCharacterTasks(this.character._id, this.type, this.repeats))
    this.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  async toggleEditMode() {
    
    if(this.editMode)
      this.store.dispatch(updateTaskPriorities({ characterId: this.character._id, tasks: this.tasks }))
    
    this.editMode = !this.editMode;
  }

  draggingIndex: number;
  onDragStart(fromIndex: number): void {
    this.draggingIndex = fromIndex;
  }

  onDragEnter(toIndex: number): void {
    if (this.draggingIndex !== toIndex) {
      this.tasks = arrayMove(this.tasks, this.draggingIndex, toIndex);
      this.draggingIndex = toIndex;
    }
  }

  onDragEnd(): void {
    this.draggingIndex = undefined;
  }
}
