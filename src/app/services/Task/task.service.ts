import { EventEmitter, Injectable } from '@angular/core';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { FetchService } from '../Fetch/fetch.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[];
  public tasksChanged = new EventEmitter<void>();

  private completedTasks: CompletedTask[];
  public completedTasksChanged = new EventEmitter<void>();

  constructor(private fetchService: FetchService) {
    this.fetchTasks();
    this.fetchCompletedTasks();
  }

  public getTasks(): Task[] {
    return _.cloneDeep(this.tasks);
  }

  public async fetchTasks(): Promise<void> {
    let response = await this.fetchService.get(`tasks`);
    this.tasks = await response.json();
    this.emitTasksChanged();
  }

  private emitTasksChanged() {
    this.tasksChanged.emit();
  }

  public getCompletedTasks(): CompletedTask[] {
    return this.completedTasks?.slice();
  }

  public async fetchCompletedTasks(): Promise<void> {
    let response = await this.fetchService.get(`tasks/completed/${new Date().getTime()}`);
    this.completedTasks = await response.json();
    this.emitCompletedTasksChanged();
  }

  private emitCompletedTasksChanged() {
    this.completedTasksChanged.emit();
  }

  public async changeTaskState(characterId: String, taskId: String, completed: Boolean): Promise<void> {

    let response = await this.fetchService.post('tasks/change-state',
      {
        taskId: taskId,
        characterId: characterId,
        completed: completed,
        date: new Date().getTime()
      });

    if (response.ok) {

      this.completedTasks = this.completedTasks.filter(ct => !(ct.character == characterId && ct.task == taskId));

      if (completed) {
        this.completedTasks.push(await response.json());
      }
    }

    this.emitCompletedTasksChanged();
  }

  public async getTask(id: String): Promise<Task> {

    let response = await this.fetchService.get(`tasks/${id}`);

    let task: Task = await response.json();

    return task;
  }

  async create(task: Task): Promise<void> {

    let response = await this.fetchService.post('tasks', task);

    if (response.ok) {
      let createdTask = await response.json();
      this.tasks.push(createdTask);
      this.emitTasksChanged()
    }
  }

  async update(task: Task): Promise<void> {

    let response = await this.fetchService.put('tasks', task);
    if (response.ok) {
      let updatedTask = await response.json();
      this.tasks = this.tasks.filter(t => t._id != updatedTask._id);
      this.tasks.push(updatedTask);
      this.emitTasksChanged();
    }
  }

  async delete(id: string) {
    let response = await this.fetchService.delete("tasks", { id: id });
    if (response.ok) {
      this.tasks = this.tasks.filter(t => t._id != id);
      this.emitTasksChanged();
    }
  }
}
