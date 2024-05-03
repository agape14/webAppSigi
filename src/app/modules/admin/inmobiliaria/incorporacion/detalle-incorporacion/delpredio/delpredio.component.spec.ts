import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelpredioComponent } from './delpredio.component';

describe('DelpredioComponent', () => {
  let component: DelpredioComponent;
  let fixture: ComponentFixture<DelpredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelpredioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelpredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
