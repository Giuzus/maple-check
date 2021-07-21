import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { FetchService } from '../Fetch/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private fetchService: FetchService) { }

  public async getAllTasks(): Promise<Task[]> {

    let response = await this.fetchService.get(`tasks`);

    let tasks: Task[] = await response.json();

    return tasks;
  }

  public async getTasks(date: Date,  type: String): Promise<Task[]> {

    let response = await this.fetchService.get(`tasks/${type}/${date.getTime()}`);

    let tasks: Task[] = await response.json();

    return tasks;

  }

  async ChangeTaskState(taskId: string, checked: boolean, date: Date): Promise<boolean> {

    let response = await this.fetchService.post('quests/changestate',
      {
        id: taskId,
        completed: checked,
        date: date.toUTCString()
      });

    return response.ok;
  }
}
