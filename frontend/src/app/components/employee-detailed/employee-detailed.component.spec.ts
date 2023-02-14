import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailedComponent } from './employee-detailed.component';

describe('EmployeeDetailedComponent', () => {
  let component: EmployeeDetailedComponent;
  let fixture: ComponentFixture<EmployeeDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
