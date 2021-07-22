import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  task: Task;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      let id = params["id"];
      
      this.task = await this.taskService.getTask(id);
    });
  }
}
