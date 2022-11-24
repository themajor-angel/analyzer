import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAnalisisComponent } from './mostrar-analisis.component';

describe('MostrarAnalisisComponent', () => {
  let component: MostrarAnalisisComponent;
  let fixture: ComponentFixture<MostrarAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarAnalisisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
