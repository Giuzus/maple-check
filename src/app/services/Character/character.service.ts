import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { FetchService } from '../fetch/fetch.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    constructor(private fetchService: FetchService) {}

    async getAll(): Promise<Character[]> {
        let response = await this.fetchService.get("characters");
        return await response.json();
    }

    async create(character: Character) {
        await this.fetchService.post("characters", character);
    }

    async update(character: Character) {
        await this.fetchService.put("characters", character);
    }

    async delete(id: String) {
        await this.fetchService.delete("characters", { id: id });
    }
}
