import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosComponent } from './espacios';

describe('Espacios', () => {
  let component: EspaciosComponent;
  let fixture: ComponentFixture<EspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaciosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EspaciosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
