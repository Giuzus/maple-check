import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from 'src/app/models/Character';
import { deleteCharacter } from 'src/app/state/characters/character.actions';

@Component({
  selector: '[app-character-list-item]',
  templateUrl: './character-list-item.component.html',
  styleUrls: ['./character-list-item.component.scss']
})
export class CharacterListItemComponent implements OnInit {

  @Input() character: Character;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  async delete(characterId) {
    this.store.dispatch(deleteCharacter({id: characterId}));
  }
}
