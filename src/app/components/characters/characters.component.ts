import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { selectCharacterStateStatus, selectAllCharacters } from 'src/app/state/characters/character.selector';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters$: Observable<Character[]> = this.store.select(selectAllCharacters);
  charactersStatus$: Observable<String> = this.store.select(selectCharacterStateStatus);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  
}
