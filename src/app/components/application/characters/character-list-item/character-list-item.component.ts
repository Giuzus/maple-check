import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/Character/character.service';

@Component({
  selector: '[app-character-list-item]',
  templateUrl: './character-list-item.component.html',
  styleUrls: ['./character-list-item.component.css']
})
export class CharacterListItemComponent implements OnInit {

  @Input() character: Character;

  deleting: boolean;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  async delete(characterId) {
    this.deleting = true;
    await this.characterService.delete(characterId);
    this.deleting = false;
  }
}
