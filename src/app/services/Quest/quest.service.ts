import { Injectable } from '@angular/core';
import { Quest } from '../../models/Quest';
import { FetchService } from '../Fetch/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private fetchService: FetchService) { }

  public async getQuests(date: Date): Promise<Quest[]> {

    let response = await this.fetchService.get(`quests/${date.toUTCString()}`);

    let quests: Quest[] = await response.json();

    return quests;

  }

  async ChangeQuestState(questId: string, checked: boolean, date: Date): Promise<boolean> {

    let response = await this.fetchService.post('quests/changestate',
      {
        id: questId,
        completed: checked,
        date: date.toUTCString()
      });

    return response.ok;

  }
}
