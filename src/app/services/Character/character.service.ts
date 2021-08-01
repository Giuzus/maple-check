import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { Class } from 'src/app/models/Class';
import { FetchService } from '../Fetch/fetch.service';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    private characters: Character[];
    private classes: Class[];

    public charactersChanged = new EventEmitter<Character[]>();
    public classesChanged = new EventEmitter<Class[]>();

    constructor(private fetchService: FetchService) {
        this.fetchCharacters();
        this.fetchClasses();
    }

    public getCharacters(): Character[] {
        return this.characters?.slice();
    }

    public async getCharacter(id: any): Promise<Character> {
        let response = await this.fetchService.get(`characters/${id}`);
        let character: Character = await response.json();
        return character;
    }

    public getClasses(): Class[] {
        return this.classes?.slice();
    }

    private async fetchCharacters(): Promise<void> {
        let response = await this.fetchService.get("characters");
        this.characters = await response.json();

        this.emitCharactersChanged();
    }

    private async fetchClasses(): Promise<void> {
        let response = await this.fetchService.get("characters/classes");
        this.classes = await response.json();
        this.classes.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        this.emitClassesChanged();
    }

    private emitCharactersChanged() {
        this.charactersChanged.emit(this.getCharacters());
    }

    private emitClassesChanged() {
        this.classesChanged.emit(this.getClasses());
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

    async update(character: Character) {
        let response = await this.fetchService.put("characters", character);

        if (response.ok) {
            let updatedCharacter = await response.json();
            this.characters = this.characters.filter((char) => char._id != updatedCharacter._id);
            this.characters.push(updatedCharacter)
            this.emitCharactersChanged();
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
