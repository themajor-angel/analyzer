import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAsociadosComponent } from './ver-asociados.component';

describe('VerAsociadosComponent', () => {
  let component: VerAsociadosComponent;
  let fixture: ComponentFixture<VerAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAsociadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
