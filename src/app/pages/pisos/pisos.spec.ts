import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PisosComponent } from './pisos';

describe('Pisos', () => {
  let component: PisosComponent;
  let fixture: ComponentFixture<PisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PisosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PisosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
