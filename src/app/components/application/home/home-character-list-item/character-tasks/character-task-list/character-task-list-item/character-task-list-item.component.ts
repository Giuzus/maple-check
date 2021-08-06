import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { brush } from 'ngx-bootstrap-icons';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';

@Component({
  selector: '[app-character-task-list-item]',
  templateUrl: './character-task-list-item.component.html',
  styleUrls: ['./character-task-list-item.component.scss']
})
export class CharacterTaskListItemComponent implements OnInit {

  @Input() task: Task;
  @Input() completedTasks: CompletedTask[];
  @Input() character: Character;
  @Input() editMode: Boolean;

  @Output() priorityChanged = new EventEmitter<{ taskId: String, direction: number }>();

  saving: boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void { }

  async changeTaskState() {
    if (this.saving)
      return;

    this.task.complete = !this.task.complete;

    this.saving = true;
    await this.taskService.changeTaskState(this.character._id, this.task._id, this.task.complete);
    this.saving = false;
  }

  toggleHiddenState() {
    this.task.hidden = !this.task.hidden;
  }

  changePriority(direction: number) {
    this.priorityChanged.emit({ taskId: this.task._id, direction: direction });
  }
}
