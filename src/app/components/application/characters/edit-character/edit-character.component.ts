import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/Character/character.service';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  character: Character;

  constructor(private characterService: CharacterService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params["id"];
      this.character = await this.characterService.getCharacter(id);
    });
  }

}
