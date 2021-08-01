import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTaskListComponent } from './character-task-list.component';

describe('CharacterTaskListComponent', () => {
  let component: CharacterTaskListComponent;
  let fixture: ComponentFixture<CharacterTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
