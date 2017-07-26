import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToFollowComponent } from './to-follow.component';

describe('ToFollowComponent', () => {
  let component: ToFollowComponent;
  let fixture: ComponentFixture<ToFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
