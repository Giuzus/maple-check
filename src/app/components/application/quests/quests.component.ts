import { Component, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/Quest';
import { QuestService } from 'src/app/services/quest.service';

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

        this.dailyQuests = quests.filter(x => x.type == "DAILY");
        this.weeklyQuests = quests.filter(x => x.type == "WEEKLY");
      });
  }
}
