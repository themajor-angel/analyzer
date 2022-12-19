import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBalanceComponent } from './card-balance.component';

describe('CardBalanceComponent', () => {
  let component: CardBalanceComponent;
  let fixture: ComponentFixture<CardBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
