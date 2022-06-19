import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Character } from 'src/app/models/Character';
import { selectAllCharacters, selectCharacter } from 'src/app/state/characters/character.selector';

@Component({
  selector: 'app-character-tasks',
  templateUrl: './character-tasks.component.html',
  styleUrls: ['./character-tasks.component.scss']
})
export class CharacterTasksComponent implements OnInit {

  character$: Observable<Character>;

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let charId = params["id"];

      if (charId) {
        this.character$ = this.store.select(selectCharacter(charId));
      }
      else {
        //no char id parameter, find first and redirect;
        this.store.select(selectAllCharacters).pipe(first()).subscribe(chars => {
          if (chars?.length > 0) {
            this.router.navigate(["home", chars[0]._id])
          }
        });
      }
    })
  }

}
