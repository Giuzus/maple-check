import { Component, Input, OnInit } from '@angular/core';
import { TaskType } from 'src/app/enums/task-type.enum';
import { Task } from 'src/app/models/Task';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  constructor() { }

  @Input() task: Task;

  taskTypes = TaskType;

  ngOnInit(): void {
    
  }
  
}
