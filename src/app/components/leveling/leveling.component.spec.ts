import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelingComponent } from './leveling.component';

describe('LevelingComponent', () => {
  let component: LevelingComponent;
  let fixture: ComponentFixture<LevelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
