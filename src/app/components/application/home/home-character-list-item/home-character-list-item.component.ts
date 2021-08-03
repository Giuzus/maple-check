import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-home-character-list-item',
  templateUrl: './home-character-list-item.component.html',
  styleUrls: ['./home-character-list-item.component.css']
})
export class HomeCharacterListItemComponent implements OnInit {

  @Input() character: Character;
  
  isCollapsed: boolean;

  constructor() { }

  ngOnInit(): void {
    let localStoredValue = localStorage.getItem(`CharacterCollapsed:${this.character._id}`);
    this.isCollapsed = localStoredValue == undefined || localStoredValue == "true";

  }

  saveCollapseState() {
    localStorage.setItem(`CharacterCollapsed:${this.character._id}`, this.isCollapsed.toString());
  }
}
