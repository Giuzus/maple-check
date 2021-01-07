import { Component, Input, OnInit } from '@angular/core';
import { Boss } from 'src/app/models/Boss';
import { BossService } from 'src/app/services/Boss/boss.service';

@Component({
  selector: 'app-boss-list-item',
  templateUrl: './boss-list-item.component.html',
  styleUrls: ['./boss-list-item.component.css']
})
export class BossListItemComponent implements OnInit {

  @Input() boss: Boss;

  constructor(private bossService: BossService) { }

  public loading: boolean;

  ngOnInit(): void {
  }

  async bossStateChanged(bossId: string, event: any) {

    this.loading = true;

    let checked = event.currentTarget.checked
    await this.bossService.ChangeBossState(bossId,checked , new Date());

    this.boss.completed = checked;

    this.loading = false;
  }

}
