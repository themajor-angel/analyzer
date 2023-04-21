import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarempresaComponent } from './editarempresa.component';

describe('EditarempresaComponent', () => {
  let component: EditarempresaComponent;
  let fixture: ComponentFixture<EditarempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
