import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleIncorporacionComponent } from './detalle-incorporacion.component';

describe('DetalleIncorporacionComponent', () => {
  let component: DetalleIncorporacionComponent;
  let fixture: ComponentFixture<DetalleIncorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleIncorporacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleIncorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
