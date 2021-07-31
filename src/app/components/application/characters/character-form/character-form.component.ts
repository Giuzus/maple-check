import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { Class } from 'src/app/models/Class';
import { CharacterService } from 'src/app/services/Character/character.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {

  @Input() character: Character;

  classes: Class[];

  constructor(private characterService: CharacterService, private router: Router) { }

  ngOnInit(): void {
    this.classes = this.characterService.getClasses();
    this.characterService.classesChanged.subscribe(classes => {
      this.classes = classes;
    });
  }

  async save() {
    if (this.character._id) {
      await this.characterService.update(this.character);
    }
    else {
      await this.characterService.create(this.character);
    }

    this.router.navigate(["characters"]);
  }
}
