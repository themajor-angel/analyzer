import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaAsociadosComponent } from './edita-asociados.component';

describe('EditaAsociadosComponent', () => {
  let component: EditaAsociadosComponent;
  let fixture: ComponentFixture<EditaAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaAsociadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
