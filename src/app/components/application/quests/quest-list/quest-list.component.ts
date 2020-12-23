import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/Quest';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.css']
})
export class QuestListComponent implements OnInit {

  constructor(private questService: QuestService) { }

  @Input() quests: Quest[];

  ngOnInit(): void {
  }

  async questStateChanged(questId: string, event: any) {

    await this.questService.ChangeQuestState(questId, event.currentTarget.checked, new Date());

  }
}
