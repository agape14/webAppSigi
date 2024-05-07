import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelosdatostecnicosComponent } from './delosdatostecnicos.component';

describe('DelosdatostecnicosComponent', () => {
  let component: DelosdatostecnicosComponent;
  let fixture: ComponentFixture<DelosdatostecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelosdatostecnicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelosdatostecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
