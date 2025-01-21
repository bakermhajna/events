import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardGroupComponent } from './mat-card-group.component';

describe('MatCardGroupComponent', () => {
  let component: MatCardGroupComponent;
  let fixture: ComponentFixture<MatCardGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
