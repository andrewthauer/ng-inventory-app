import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';

import { TitleComponent } from './title.component';

@Component({
  template: `
    <app-title title="some text">
      <span>meta</span>
    </app-title>
  `,
})
class TitleTestComponent {}

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TitleComponent>;
  let component: TitleComponent;
  let debugEl: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent, TitleTestComponent],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugEl = fixture.debugElement;
  }));

  it('should create the title', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title to be empty`, async(() => {
    expect(component.title).toBeFalsy();
  }));

  it(`should have as title 'hello!'`, async(() => {
    component.title = 'hello!';
    expect(component.title).toEqual('hello!');
  }));

  it('should render title in a h3 tag', async(() => {
    component.title = 'acme';
    fixture.detectChanges();
    expect(element.querySelector('h3').textContent).toContain('acme');
  }));

  describe('with content', () => {
    let testFixture: ComponentFixture<TitleTestComponent>;
    let testComponent: TitleTestComponent;

    beforeEach(async(() => {
      testFixture = TestBed.createComponent(TitleTestComponent);
      testComponent = testFixture.componentInstance;
      element = testFixture.nativeElement;
      debugEl = testFixture.debugElement;
    }));

    it('should render title with additional content', async(() => {
      testFixture.detectChanges();
      expect(element.querySelector('span').textContent).toContain('meta');
    }));
  });
});
