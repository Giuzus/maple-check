import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-character-task-list',
  templateUrl: './character-task-list.component.html',
  styleUrls: ['./character-task-list.component.css']
})
export class CharacterTaskListComponent implements OnInit {

  @Input() character: Character;
  @Input() label: String;

  @Input() type: String;
  @Input() repeats: String;

  tasks: Task[];
  completedTasks: CompletedTask[];

  editMode: Boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.filterTasks(this.taskService.getTasks());
    this.taskService.tasksChanged.subscribe(() => this.tasks = this.filterTasks(this.taskService.getTasks()));

    this.completedTasks = this.filterCompletedTasks(this.taskService.getCompletedTasks());
    this.taskService.completedTasksChanged.subscribe(() => this.completedTasks = this.filterCompletedTasks(this.taskService.getCompletedTasks()));
  }

  filterTasks(tasks: Task[]): Task[] {
    if (tasks) {
      return tasks.filter(task => task.type == this.type && task.repeats == this.repeats);
    }
  }

  filterCompletedTasks(completedTasks: CompletedTask[]): CompletedTask[] {
    if (completedTasks) {
      return completedTasks.filter(completedTask => completedTask.character == this.character._id);
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
