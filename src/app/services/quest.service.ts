import { Injectable } from '@angular/core';
import { Quest } from '../models/Quest';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private fetchService: FetchService) { }

  public async getQuests(date: Date): Promise<Quest[]> {
    try {
      let response = await this.fetchService.get(`quests/${date.toDateString()}`);

      let quests: Quest[] = await response.json();

      return quests;

    }
    catch (err) {
      console.log(err);
    }
  }

  async ChangeQuestState(questId: string, checked: boolean, date: Date): Promise<boolean> {
    try {
      
      let response = await this.fetchService.post('quests/changestate',
      {
        id: questId,
        completed: checked,
        date: date.toDateString()
      });

      return response.ok;
    } catch (err) {
      console.log(err);
    }
    return false;
  }
}
