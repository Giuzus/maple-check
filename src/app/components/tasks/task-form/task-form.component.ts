import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskRepeats } from 'src/app/enums/task-repeats.enum';
import { TaskType } from 'src/app/enums/task-type.enum';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private activatedRoute: ActivatedRoute) { }

  @Input() task: Task;

  taskTypeEnum = TaskType;
  taskRepeatsEnum = TaskRepeats;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params["id"];
      if(id) {
        this.task = await this.taskService.getTask(id);
      }
      else{
        this.task = new Task();
      }
    });
  }

  async save() {
    if (this.task._id) {
      await this.taskService.update(this.task);
    }
    else {
      await this.taskService.create(this.task);
    }

    this.router.navigate(["tasks"]);
  }

}
