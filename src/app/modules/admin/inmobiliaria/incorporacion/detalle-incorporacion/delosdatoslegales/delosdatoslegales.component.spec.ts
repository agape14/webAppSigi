import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelosdatoslegalesComponent } from './delosdatoslegales.component';

describe('DelosdatoslegalesComponent', () => {
  let component: DelosdatoslegalesComponent;
  let fixture: ComponentFixture<DelosdatoslegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelosdatoslegalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelosdatoslegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
