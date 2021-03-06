import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) { }
  
  ngOnInit(): void {

    this.taskService.getAllTasks()
      .then(tasks => {
        this.tasks = tasks;
      });
  }

  async delete(id: string){
    await this.taskService.delete(id);
    
    this.tasks = this.tasks.filter((item) => item._id != id);
  }
}
