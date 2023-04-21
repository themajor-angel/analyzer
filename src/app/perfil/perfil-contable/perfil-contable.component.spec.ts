import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilContableComponent } from './perfil-contable.component';

describe('PerfilContableComponent', () => {
  let component: PerfilContableComponent;
  let fixture: ComponentFixture<PerfilContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
