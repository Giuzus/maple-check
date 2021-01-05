import { Injectable } from '@angular/core';
import { Boss } from '../models/Boss';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class BossService {

  constructor(private fetchService: FetchService) { }

  public async getBosses(date: Date): Promise<Boss[]> {
    try {
      let response = await this.fetchService.get(`bosses/${date.toUTCString()}`);

      let bosses: Boss[] = await response.json();

      return bosses;

    }
    catch (err) {
      console.log(err);
    }
  }

  async ChangeBossState(bossId: string, checked: boolean, date: Date): Promise<boolean> {
    try {

      let response = await this.fetchService.post('bosses/changestate',
        {
          id: bossId,
          completed: checked,
          date: date.toUTCString()
        });

      return response.ok;
    } catch (err) {
      console.log(err);
    }
    return false;
  }

}
