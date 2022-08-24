import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterialComponent } from './meterial.component';

describe('MeterialComponent', () => {
  let component: MeterialComponent;
  let fixture: ComponentFixture<MeterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
