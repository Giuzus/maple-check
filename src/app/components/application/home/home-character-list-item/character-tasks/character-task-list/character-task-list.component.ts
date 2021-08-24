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

  isCollapsed: boolean = false;

  constructor(private taskService: TaskService, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.tasks = this.filterTasks(this.taskService.getTasks());
    this.completedTasks = this.filterCompletedTasks(this.taskService.getCompletedTasks());
    this.updateTasksProperties();

    this.taskService.tasksChanged.subscribe(() => {
      this.tasks = this.filterTasks(this.taskService.getTasks())
      this.updateTasksProperties();
    });

    this.taskService.completedTasksChanged.subscribe(() => {
      this.completedTasks = this.filterCompletedTasks(this.taskService.getCompletedTasks())
      this.updateTasksProperties();
    });
  }

  filterTasks(tasks: Task[]): Task[] {
    if (tasks) {
      //Filter tasks 
      tasks = tasks.filter(task => task.type == this.type && task.repeats == this.repeats);

      return tasks;
    }
  }

  filterCompletedTasks(completedTasks: CompletedTask[]): CompletedTask[] {
    if (completedTasks) {
      let filteredCompletedTasks = completedTasks.filter(completedTask => completedTask.character == this.character._id);
      return filteredCompletedTasks;
    }
  }

  updateTasksProperties() {
    if (this.completedTasks && this.tasks) {
      this.tasks = this.tasks.map(task => {
        task.hidden = this.character?.configuration?.tasks.some(t => t.task == task._id && t.hidden);
        task.priority = this.character?.configuration?.tasks.findIndex(t => t.task == task._id);
        task.complete = this.completedTasks?.some(completed => completed.task == task._id);
        return task;
      });

      //Order by priority
      this.tasks = _.orderBy(this.tasks, ['priority'], ['asc']);

    }
  }

  async toggleEditMode() {

    if (this.editMode) {

      let taskIds = this.tasks.map(t => t._id);


      if (!this.character.configuration) {
        this.character.configuration = {
          hidden: false,
          tasks: []
        }
      }

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


      this.characterService.update(this.character, false);
    }

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


  onTaskStateChange(eventArgs) {
    
    this.tasks = this.tasks.map(task => {
      if (task._id == eventArgs.taskId) {
        task.complete = eventArgs.complete
      }
      return task;
    });

    this.taskService.changeTaskState(eventArgs.characterId, eventArgs.taskId, eventArgs.complete);
  }


}
