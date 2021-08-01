import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCharacterListItemComponent } from './home-character-list-item.component';

describe('CharacterListItemComponent', () => {
  let component: HomeCharacterListItemComponent;
  let fixture: ComponentFixture<HomeCharacterListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCharacterListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCharacterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
