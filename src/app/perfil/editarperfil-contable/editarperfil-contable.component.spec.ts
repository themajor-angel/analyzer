import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfilContableComponent } from './editarperfil-contable.component';

describe('EditarperfilContableComponent', () => {
  let component: EditarperfilContableComponent;
  let fixture: ComponentFixture<EditarperfilContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarperfilContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarperfilContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
