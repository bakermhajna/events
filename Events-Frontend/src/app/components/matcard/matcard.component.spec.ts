import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatcardComponent } from './matcard.component';

describe('MatcardComponent', () => {
  let component: MatcardComponent;
  let fixture: ComponentFixture<MatcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
