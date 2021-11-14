import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintingPanelComponent } from './minting-panel.component';

describe('MintingPanelComponent', () => {
  let component: MintingPanelComponent;
  let fixture: ComponentFixture<MintingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintingPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
