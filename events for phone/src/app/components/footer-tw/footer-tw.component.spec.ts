import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTwComponent } from './footer-tw.component';

describe('FooterTwComponent', () => {
  let component: FooterTwComponent;
  let fixture: ComponentFixture<FooterTwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterTwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
