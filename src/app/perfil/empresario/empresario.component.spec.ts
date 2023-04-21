import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresarioComponent } from './empresario.component';

describe('EmpresarioComponent', () => {
  let component: EmpresarioComponent;
  let fixture: ComponentFixture<EmpresarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
