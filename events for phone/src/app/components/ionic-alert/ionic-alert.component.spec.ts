import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicAlertComponent } from './ionic-alert.component';

describe('IonicAlertComponent', () => {
  let component: IonicAlertComponent;
  let fixture: ComponentFixture<IonicAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IonicAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
