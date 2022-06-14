import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/character/character.service';
import { addCharacter, updateCharacter } from 'src/app/state/characters/character.actions';
import { selectCharacter } from 'src/app/state/characters/character.selector';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {

  public character: Character;

  editCharacter$: Observable<Character>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store: Store) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      let id = params["id"];
      if(id){
        console.log("We editin")
        this.editCharacter$ = this.store.select(selectCharacter(id));
        this.editCharacter$.subscribe(char => this.character = { ...char });
      }
      else {
        console.log("We creatin")
        this.character = new Character();
      }
    });

  }

  async save() {
    if (this.character._id) {
      this.store.dispatch(updateCharacter({ character: this.character }));
    }
    else {
      this.store.dispatch(addCharacter({ character: this.character }));
    }

    this.router.navigate(["characters"]);
  }
}
