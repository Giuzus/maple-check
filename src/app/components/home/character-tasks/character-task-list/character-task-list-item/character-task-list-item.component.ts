import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from 'src/app/models/Character';
import { Task } from 'src/app/models/Task';
import { hideTask } from 'src/app/state/characters/character.actions';
import { setComplete, setIncomplete } from 'src/app/state/completedTasks/completed-task.actions';

@Component({
  selector: '[app-character-task-list-item]',
  templateUrl: './character-task-list-item.component.html',
  styleUrls: ['./character-task-list-item.component.scss']
})
export class CharacterTaskListItemComponent implements OnInit {

  @Input() task: Task;
  @Input() character: Character;
  @Input() editMode: Boolean;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  async toggleComplete() {

    if (this.task.complete) {
      this.store.dispatch(setIncomplete({ characterId: this.character._id, taskId: this.task._id }));
    }
    else {
      this.store.dispatch(setComplete({ characterId: this.character._id, taskId: this.task._id }));
    }
  }

  toggleHiddenState() {
    
    this.store.dispatch(hideTask({ characterId: this.character._id, taskId: this.task._id, hidden: !this.task.hidden }))

  }

}
