import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTasksComponent } from './character-tasks.component';

describe('CharacterTasksComponent', () => {
  let component: CharacterTasksComponent;
  let fixture: ComponentFixture<CharacterTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
