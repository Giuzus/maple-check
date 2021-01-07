import { Component, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/Quest';
import { QuestService } from 'src/app/services/Quest/quest.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit {

  public quests: Quest[];

  public dailyQuests: Quest[];
  public weeklyQuests: Quest[];

  constructor(private questService: QuestService) { }


  ngOnInit(): void {
    this.getQuests(new Date());
  }

  getQuests(date: Date) {
    this.questService.getQuests(date)
      .then(quests => {
        this.quests = quests;

        this.dailyQuests = quests.filter(x => x.type == "DAILY").sort((a, b) => this.compare(a.order, b.order));
        this.weeklyQuests = quests.filter(x => x.type == "WEEKLY").sort((a, b) => this.compare(a.order, b.order));
      });
  }

  compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

}
