import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/Task';
import { deleteTask } from 'src/app/state/tasks/task.actions';

@Component({
  selector: '[app-task-list-item]',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {

  @Input() task: Task;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  async delete(id: String) {
    this.store.dispatch(deleteTask({ id: id }))
  }
}
