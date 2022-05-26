import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCasesComponent } from './modal-cases.component';

describe('ModalCasesComponent', () => {
  let component: ModalCasesComponent;
  let fixture: ComponentFixture<ModalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
