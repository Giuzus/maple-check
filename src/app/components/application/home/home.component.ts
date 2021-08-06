import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { CharacterService } from 'src/app/services/Character/character.service';
import { TaskService } from 'src/app/services/Task/task.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  characters: Character[];
  tasks: Task[];
  completedTasks: CompletedTask[];

  constructor(private characterSerivice: CharacterService, private taskService: TaskService) { }

  ngOnInit(): void {

    this.characters = this.characterSerivice.getCharacters();
    this.characterSerivice.charactersChanged.subscribe(() => this.characters = this.characterSerivice.getCharacters());

    this.tasks = this.taskService.getTasks();
    this.taskService.tasksChanged.subscribe(() => this.tasks = this.taskService.getTasks());

    this.completedTasks = this.taskService.getCompletedTasks();
    this.taskService.completedTasksChanged.subscribe(() => this.completedTasks = this.taskService.getCompletedTasks());
  }

}
