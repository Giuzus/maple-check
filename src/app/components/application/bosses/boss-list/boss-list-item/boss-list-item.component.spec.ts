import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossListItemComponent } from './boss-list-item.component';

describe('BossListItemComponent', () => {
  let component: BossListItemComponent;
  let fixture: ComponentFixture<BossListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BossListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BossListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
