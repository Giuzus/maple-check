import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { allTasks, selectTaskStateStatus } from 'src/app/state/tasks/task.selector';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$: Observable<Task[]> = this.store.select(allTasks);
  taskStateStatus$: Observable<string> = this.store.select(selectTaskStateStatus);

  constructor(private store: Store) { }

  ngOnInit(): void {  }

  
}
