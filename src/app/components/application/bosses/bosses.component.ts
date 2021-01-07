import { Component, OnInit } from '@angular/core';
import { Boss } from 'src/app/models/Boss';
import { BossService } from 'src/app/services/Boss/boss.service';

@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.component.html',
  styleUrls: ['./bosses.component.css']
})
export class BossesComponent implements OnInit {

  public bosses: Boss[];

  public dailyBosses: Boss[];
  public weeklyBosses: Boss[];

  constructor(private bossService: BossService) { }

  ngOnInit(): void {
    this.getBosses(new Date());
  }

  getBosses(date: Date) {
    this.bossService.getBosses(date)
      .then(bosses => {
        this.bosses = bosses;

        this.dailyBosses = bosses.filter(x => x.type == "DAILY").sort((a, b) => this.compare(a.order, b.order));
        this.weeklyBosses = bosses.filter(x => x.type == "WEEKLY").sort((a, b) => this.compare(a.order, b.order));
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
