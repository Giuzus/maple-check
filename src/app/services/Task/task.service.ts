import { EventEmitter, Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { FetchService } from '../Fetch/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private todayTasks: Task[];
  // public todayTasksChanged = new EventEmitter<Task[]>();

  private tasks: Task[];
  public tasksChanged = new EventEmitter<Task[]>();

  constructor(private fetchService: FetchService) {
    //this.fetchTodayTasks();
    this.fetchTasks();
  }

  // public getTodayTasks(): Task[] {
  //   return this.todayTasks?.slice();
  // }

  // private async fetchTodayTasks(): Promise<void> {
  //   //TODO: fix backend route
  //   let date = new Date();
  //   let response = await this.fetchService.get(`tasks/${date.getTime()}`);
  //   this.todayTasks = await response.json();
  //   this.emitTodayTasksChanged();
  // }

  // private emitTodayTasksChanged() {
  //   this.todayTasksChanged.emit(this.getTodayTasks());
  // }

  public getTasks(): Task[] {
    return this.tasks?.slice();
  }

  public async fetchTasks(): Promise<void> {

    let response = await this.fetchService.get(`tasks`);
    this.tasks = await response.json();
    console.log(this.tasks);
    this.emitTasksChanged();
  }

  private emitTasksChanged() {
    this.tasksChanged.emit(this.getTasks());
    console.log(this.getTasks());
  }

  // public async changeTaskState(taskId: string, checked: boolean, date: Date): Promise<boolean> {

  //   let response = await this.fetchService.post('tasks/changestate',
  //     {
  //       id: taskId,
  //       completed: checked,
  //       date: date.toUTCString()
  //     });

  //   return response.ok;
  // }

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
    if(response.ok){
      let updatedTask = await response.json();
      this.tasks = this.tasks.filter(t => t._id != updatedTask._id);
      this.tasks.push(updatedTask);
      this.emitTasksChanged();
    }
  }

  async delete(id: string) {
    let response = await this.fetchService.delete("tasks", { id: id });
    if(response.ok){
      this.tasks = this.tasks.filter(t => t._id != id);
      this.emitTasksChanged();
    }
  }
}
