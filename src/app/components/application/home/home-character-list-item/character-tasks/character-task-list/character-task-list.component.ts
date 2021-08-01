import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/Task/task.service';

@Component({
  selector: 'app-character-task-list',
  templateUrl: './character-task-list.component.html',
  styleUrls: ['./character-task-list.component.css']
})
export class CharacterTaskListComponent implements OnInit {

  @Input() tasks: Task[];
  @Input() completedTasks: CompletedTask[];
  @Input() character: Character;

  constructor() { }

  ngOnInit(): void {
  }
}
