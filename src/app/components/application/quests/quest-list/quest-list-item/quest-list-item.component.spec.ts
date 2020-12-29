import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestListItemComponent } from './quest-list-item.component';

describe('QuestListItemComponent', () => {
  let component: QuestListItemComponent;
  let fixture: ComponentFixture<QuestListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
