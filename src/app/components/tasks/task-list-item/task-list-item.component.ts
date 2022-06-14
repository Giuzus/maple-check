import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: '[app-task-list-item]',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {

  @Input() task: Task;
  deleting: boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  async delete(id: string) {
    this.deleting = true;
    await this.taskService.delete(id);
    this.deleting = false;
  }

}
