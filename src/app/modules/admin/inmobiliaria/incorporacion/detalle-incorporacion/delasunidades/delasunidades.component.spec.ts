import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelasunidadesComponent } from './delasunidades.component';

describe('DelasunidadesComponent', () => {
  let component: DelasunidadesComponent;
  let fixture: ComponentFixture<DelasunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelasunidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelasunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
