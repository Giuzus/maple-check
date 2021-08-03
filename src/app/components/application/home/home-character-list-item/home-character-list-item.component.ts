import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CompletedTask } from 'src/app/models/CoompletedTask';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-home-character-list-item',
  templateUrl: './home-character-list-item.component.html',
  styleUrls: ['./home-character-list-item.component.css']
})
export class HomeCharacterListItemComponent implements OnInit {

  @Input() character: Character;
  
  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let localStoredValue = localStorage.getItem(`CharacterCollapsed:${this.character._id}`);
    this.isCollapsed = localStoredValue == undefined || localStoredValue == "true";

  }

  saveCollapseState() {
    localStorage.setItem(`CharacterCollapsed:${this.character._id}`, this.isCollapsed.toString());
  }
}
