import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { Class } from 'src/app/models/Class';
import { FetchService } from '../Fetch/fetch.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    private characters: Character[];
    private classes: Class[];

    public charactersChanged = new EventEmitter<void>();
    public classesChanged = new EventEmitter<void>();

    constructor(private fetchService: FetchService) {
        this.fetchCharacters();
        this.fetchClasses();
    }

    public getCharacters(): Character[] {
        return _.cloneDeep(this.characters);
    }

    public async getCharacter(id: any): Promise<Character> {
        let response = await this.fetchService.get(`characters/${id}`);
        let character: Character = await response.json();
        return character;
    }

    public getClasses(): Class[] {
        return _.cloneDeep(this.classes);
    }

    private async fetchCharacters(): Promise<void> {
        let response = await this.fetchService.get("characters");
        this.characters = await response.json();

        this.emitCharactersChanged();
    }

    private async fetchClasses(): Promise<void> {
        let response = await this.fetchService.get("characters/classes");
        this.classes = await response.json();
        this.emitClassesChanged();
    }

    private emitCharactersChanged() {
        this.charactersChanged.emit();
    }

    private emitClassesChanged() {
        this.classesChanged.emit();
    }

    async create(character: Character) {
        let response = await this.fetchService.post("characters", character);

        if (response.ok) {
            let createdCharacter = await response.json();
            this.characters.push(createdCharacter)
            this.emitCharactersChanged();
            return createdCharacter;
        }
    }

    async update(character: Character, emitChanged: Boolean = true) {
        let response = await this.fetchService.put("characters", character);

        if (response.ok) {
            let updatedCharacter = await response.json();
            let updatedCharIndex = this.characters.findIndex((char) => char._id == updatedCharacter._id);
            this.characters[updatedCharIndex] = updatedCharacter;
            
            if (emitChanged) {
                this.emitCharactersChanged();
            }
            
            return updatedCharacter;
        }
    }

    async delete(id: string) {
        let response = await this.fetchService.delete("characters", { id: id });
        if (response.ok) {
            this.characters = this.characters.filter(c => c._id != id);
            this.emitCharactersChanged();
        }
    }
}
