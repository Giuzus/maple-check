import { Component, Input, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/Quest';
import { QuestService } from 'src/app/services/Quest/quest.service';

@Component({
  selector: 'app-quest-list-item',
  templateUrl: './quest-list-item.component.html',
  styleUrls: ['./quest-list-item.component.css']
})
export class QuestListItemComponent implements OnInit {

  @Input() quest: Quest;

  constructor(private questService: QuestService) { }

  public loading: boolean;

  ngOnInit(): void {
  }

  async questStateChanged(questId: string, event: any) {

    this.loading = true;

    let checked = event.currentTarget.checked;

    await this.questService.ChangeQuestState(questId, checked , new Date());

    this.quest.completed = checked;

    this.loading = false;
  }
}