import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskRepeats } from 'src/app/enums/task-repeats.enum';
import { TaskType } from 'src/app/enums/task-type.enum';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';
import { addTask, updateTask } from 'src/app/state/tasks/task.actions';
import { selectTask } from 'src/app/state/tasks/task.selector';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store) { }

  @Input() task: Task;

  taskTypeEnum = TaskType;
  taskRepeatsEnum = TaskRepeats;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params["id"];
      if (id) {
        let task$ = this.store.select(selectTask(id))

        task$.subscribe((task) => {
          this.task = { ...task };
        })

      }
      else {
        this.task = new Task();
      }
    });
  }

  save() {
    if (this.task._id) {
      this.store.dispatch(updateTask({ task: this.task }))
    }
    else {
      this.store.dispatch(addTask({ task: this.task }))
    }

    this.router.navigate(["tasks"]);
  }
}
