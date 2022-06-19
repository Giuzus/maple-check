import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { selectAllCharacters, selectCharacterStateStatus } from 'src/app/state/characters/character.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  characters$: Observable<Character[]> = this.store.select(selectAllCharacters);
  charactersStatus$: Observable<string> = this.store.select(selectCharacterStateStatus)

  activeId: String;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
