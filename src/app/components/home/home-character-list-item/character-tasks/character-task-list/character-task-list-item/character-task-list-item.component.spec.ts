import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTaskListItemComponent } from './character-task-list-item.component';

describe('CharacterTaskListItemComponent', () => {
  let component: CharacterTaskListItemComponent;
  let fixture: ComponentFixture<CharacterTaskListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterTaskListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
