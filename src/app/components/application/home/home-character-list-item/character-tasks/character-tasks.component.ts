import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-character-tasks',
  templateUrl: './character-tasks.component.html',
  styleUrls: ['./character-tasks.component.scss']
})
export class CharacterTasksComponent implements OnInit {

  @Input() character: Character;
  
  constructor() { }

  ngOnInit(): void {
  }

}
