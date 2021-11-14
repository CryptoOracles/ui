import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintingPromptComponent } from './minting-prompt.component';

describe('MintingPromptComponent', () => {
  let component: MintingPromptComponent;
  let fixture: ComponentFixture<MintingPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintingPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintingPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
