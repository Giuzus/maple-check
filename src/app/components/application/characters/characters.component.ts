import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/Character/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {

    this.characters = this.characterService.getCharacters();
    this.characterService.charactersChanged.subscribe(characters => this.characters = characters);
  }

  
}
