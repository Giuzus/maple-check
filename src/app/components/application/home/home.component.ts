import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { CharacterService } from 'src/app/services/Character/character.service';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { TaskService } from 'src/app/services/Task/task.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private characterSerivice: CharacterService, private taskService: TaskService) { }

  characters: Character[];
  tasks: Task[];
  completedTasks: CompletedTask[];

  ngOnInit(): void {
    this.characters = this.characterSerivice.getCharacters();
    this.characterSerivice.charactersChanged.subscribe(c => this.characters = c);

    this.tasks = this.taskService.getTasks();
    this.taskService.tasksChanged.subscribe(t => this.tasks = t);

    this.completedTasks = this.taskService.getCompletedTasks();
    this.taskService.completedTasksChanged.subscribe(t => this.completedTasks = t);
  }
}
