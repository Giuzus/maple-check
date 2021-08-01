import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';

@Component({
  selector: '[app-character-task-list-item]',
  templateUrl: './character-task-list-item.component.html',
  styleUrls: ['./character-task-list-item.component.css']
})
export class CharacterTaskListItemComponent implements OnInit {

  @Input() task: Task;
  @Input() completedTasks: CompletedTask[];
  @Input() character: Character;

  saving: boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  isCompleted(id: string): boolean {
    return this.completedTasks.some(completed => completed.task == id);
  }

  async changeTaskState(characterId, taskId, completed) {
    if(this.saving)
      return;

    this.saving = true;
    await this.taskService.changeTaskState(characterId,taskId,completed);
    this.saving = false;
  }

}
