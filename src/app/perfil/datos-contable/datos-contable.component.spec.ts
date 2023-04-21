import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContableComponent } from './datos-contable.component';

describe('DatosContableComponent', () => {
  let component: DatosContableComponent;
  let fixture: ComponentFixture<DatosContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
