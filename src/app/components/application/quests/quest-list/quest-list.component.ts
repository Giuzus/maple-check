import { Component, Input, OnInit } from '@angular/core';
import { Quest } from 'src/app/models/Quest';


@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.css']
})
export class QuestListComponent implements OnInit {

  constructor() { }

  @Input() quests: Quest[];

  ngOnInit(): void {
  }
}
