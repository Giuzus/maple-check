import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';
import * as _ from 'lodash';
import * as arrayMove from 'array-move';
import { CharacterService } from 'src/app/services/Character/character.service';

@Component({
  selector: 'app-character-task-list',
  templateUrl: './character-task-list.component.html',
  styleUrls: ['./character-task-list.component.scss']
})
export class CharacterTaskListComponent implements OnInit {

  @Input() character: Character;
  @Input() label: String;

  @Input() type: String;
  @Input() repeats: String;

  tasks: Task[];
  completedTasks: CompletedTask[];

  editMode: Boolean;
  saving: Boolean;

  isCollapsed: boolean = false;

  constructor(private taskService: TaskService, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.tasks = this.filterTasks(this.taskService.getTasks());
    this.taskService.tasksChanged.subscribe(() => this.tasks = this.filterTasks(this.taskService.getTasks()));

    this.completedTasks = this.filterCompletedTasks(this.taskService.getCompletedTasks());
    this.taskService.completedTasksChanged.subscribe(() => this.completedTasks = this.filterCompletedTasks(this.taskService.getCompletedTasks()));
  }

  filterTasks(tasks: Task[]): Task[] {
    if (tasks) {
      //Filter tasks 
      tasks = tasks.filter(task => task.type == this.type && task.repeats == this.repeats);

      //Load configurations
      tasks = tasks.map(task => {
        task.hidden = this.character.configuration.tasks.some(t => t.task == task._id && t.hidden);
        task.priority = this.character.configuration.tasks.findIndex(t => t.task == task._id);
        return task;
      });

      //Order by priority
      tasks = _.orderBy(tasks, ['priority'], ['asc']);

      return tasks;
    }
  }

  filterCompletedTasks(completedTasks: CompletedTask[]): CompletedTask[] {
    if (completedTasks) {
      return completedTasks.filter(completedTask => completedTask.character == this.character._id);
    }
  }

  async toggleEditMode() {

    if (this.saving)
      return;

    if (this.editMode) {

      let taskIds = this.tasks.map(t => t._id);

      console.log(this.character.configuration.tasks);

      //remove old task configuration
      this.character.configuration.tasks = this.character.configuration.tasks.filter(config => !taskIds.includes(config.task));
      
      //Add new configuration
      this.character.configuration.tasks = this.character.configuration.tasks.concat(this.tasks.map((task, index) => {
        return {
          task: task._id,
          hidden: task.hidden,
          priority: index
        }
      }));
      
      this.saving = true;

      this.characterService.update(this.character, false)
        .then(() => {
          this.saving = false;
        });
    }

    this.editMode = !this.editMode;
  }

  priorityChanged(args: { taskId: String, direction: number }) {

    let taskIndex = this.tasks.findIndex(t => t._id == args.taskId);

    let nextIndex = taskIndex + args.direction;

    if (nextIndex < 0 || nextIndex > this.tasks.length)
      return;

    this.tasks = arrayMove(this.tasks, taskIndex, nextIndex);
  }

}
