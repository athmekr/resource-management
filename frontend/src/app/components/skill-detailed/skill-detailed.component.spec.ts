import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDetailedComponent } from './skill-detailed.component';

describe('SkillDetailedComponent', () => {
  let component: SkillDetailedComponent;
  let fixture: ComponentFixture<SkillDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
