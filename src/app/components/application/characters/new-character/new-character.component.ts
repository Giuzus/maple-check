import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {

  character: Character;
  
  constructor() { 
    this.character = new Character();
  }

  ngOnInit(): void {
  }

}
