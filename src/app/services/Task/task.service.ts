import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { FetchService } from '../Fetch/fetch.service';
import { ToastService } from '../Toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private fetchService: FetchService, private toastService: ToastService) { }

  public async getAllTasks(): Promise<Task[]> {

    let response = await this.fetchService.get(`tasks`);

    let tasks: Task[] = await response.json();

    return tasks;
  }

  public async getTasks(date: Date, type: String): Promise<Task[]> {

    let response = await this.fetchService.get(`tasks/${type}/${date.getTime()}`);

    let tasks: Task[] = await response.json();

    return tasks;
  }

  public async getTask(id: String): Promise<Task> {

    let response = await this.fetchService.get(`tasks/${id}`);

    let task: Task = await response.json();

    return task;
  }

  async changeTaskState(taskId: string, checked: boolean, date: Date): Promise<boolean> {

    let response = await this.fetchService.post('tasks/changestate',
      {
        id: taskId,
        completed: checked,
        date: date.toUTCString()
      });

    return response.ok;
  }

  async create(task: Task): Promise<Task> {

    let response = await this.fetchService.post('tasks', task);
    if (response.ok) {
      return await response.json();
    }
    else{
      throw new Error(await response.text());
    }
  }

  async update(task: Task): Promise<Task> {

    let response = await this.fetchService.put('tasks', task);
    if (response.ok) {
      return await response.json();
    }
    else{
      throw new Error(await response.text());
    }
  }

  async delete(id: string) {
    let response = await this.fetchService.delete("tasks", {id: id });
  }

}
