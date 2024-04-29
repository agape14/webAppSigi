import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleIngresosComponent } from './detalle-ingresos.component';

describe('DetalleIngresosComponent', () => {
  let component: DetalleIngresosComponent;
  let fixture: ComponentFixture<DetalleIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
