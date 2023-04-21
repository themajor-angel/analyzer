import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmpresarioComponent } from './datos-empresario.component';

describe('DatosEmpresarioComponent', () => {
  let component: DatosEmpresarioComponent;
  let fixture: ComponentFixture<DatosEmpresarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmpresarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosEmpresarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
