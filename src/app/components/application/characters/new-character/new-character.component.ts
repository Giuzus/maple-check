import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { Class } from 'src/app/models/Class';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})
export class NewCharacterComponent implements OnInit {

  character: Character;
  
  constructor() { 
    this.character = new Character();
    this.character.class = new Class();
  }

  ngOnInit(): void {
  }

}
