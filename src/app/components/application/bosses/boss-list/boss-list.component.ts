import { Component, Input, OnInit } from '@angular/core';
import { Boss } from 'src/app/models/Boss';

@Component({
  selector: 'app-boss-list',
  templateUrl: './boss-list.component.html',
  styleUrls: ['./boss-list.component.css']
})
export class BossListComponent implements OnInit {

  constructor() { }

  @Input() bosses: Boss[];

  ngOnInit(): void {
  }

}
