import { EventEmitter, Injectable } from '@angular/core';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { FetchService } from '../fetch/fetch.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private fetchService: FetchService) {
  }

  public async getTasks(): Promise<Task[]> {
    let response = await this.fetchService.get(`tasks`);
    return await response.json();
  }

  public async getCompletedTasks(): Promise<CompletedTask[]> {
    let response = await this.fetchService.get(`tasks/completed/${new Date().getTime()}`);
    return await response.json();
  }

  public async changeTaskState(characterId: String, taskId: String, completed: Boolean): Promise<void> {

    await this.fetchService.post('tasks/change-state',
      {
        taskId: taskId,
        characterId: characterId,
        completed: completed,
        date: new Date().getTime()
      });
  }

  public async getTask(id: String): Promise<Task> {

    let response = await this.fetchService.get(`tasks/${id}`);
    return await response.json();
  }

  async create(task: Task): Promise<void> {
    await this.fetchService.post('tasks', task);
  }

  async update(task: Task): Promise<void> {
    await this.fetchService.put('tasks', task);
  }

  async delete(id: String): Promise<void> {
    await this.fetchService.delete("tasks", { id: id });
  }
}
