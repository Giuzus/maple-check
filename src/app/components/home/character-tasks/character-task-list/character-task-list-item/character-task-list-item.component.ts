import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { brush } from 'ngx-bootstrap-icons';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';
import { hideTask } from 'src/app/state/characters/character.actions';

@Component({
  selector: '[app-character-task-list-item]',
  templateUrl: './character-task-list-item.component.html',
  styleUrls: ['./character-task-list-item.component.scss']
})
export class CharacterTaskListItemComponent implements OnInit {

  @Input() task: Task;
  @Input() character: Character;
  @Input() editMode: Boolean;

  saving: boolean;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  async toggleComplete() {

    // this.onTaskStateChange.emit({
    //   characterId: this.character._id,
    //   taskId: this.task._id,
    //   complete: !this.task.complete
    // });
  }

  toggleHiddenState() {
    
    this.store.dispatch(hideTask({characterId: this.character._id, taskId: this.task._id, hidden: !this.task.hidden}))

  }

}