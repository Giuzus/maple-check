import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';
import { loadCharacters } from 'src/app/state/characters/character.actions';
import { selectCharacterStateStatus, selectAllCharacters } from 'src/app/state/characters/character.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  characters$: Observable<Character[]> = this.store.select(selectAllCharacters);
  charactersStatus$: Observable<string> = this.store.select(selectCharacterStateStatus)
  tasks: Task[];
  completedTasks: CompletedTask[];

  constructor(private store: Store, private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.taskService.tasksChanged.subscribe(() => this.tasks = this.taskService.getTasks());

    this.completedTasks = this.taskService.getCompletedTasks();
    this.taskService.completedTasksChanged.subscribe(() => this.completedTasks = this.taskService.getCompletedTasks());
  }

}
