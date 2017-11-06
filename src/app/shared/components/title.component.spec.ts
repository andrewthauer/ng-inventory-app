import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TitleComponent } from './title.component';

@Component({
  template: `
    <app-title title="some text">
      <span>meta</span>
    </app-title>
  `
})
class TitleTestComponent { }

describe('TitleComponent', () => {
  let fixture;
  let title: TitleComponent;
  let element;
  let debugEl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleComponent,
        TitleTestComponent,
      ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    title = fixture.componentInstance;
    element = fixture.nativeElement;
    debugEl = fixture.debugElement;
  }));

  it('should create the title', async(() => {
    expect(title).toBeTruthy();
  }));

  it(`should have as title to be empty`, async(() => {
    expect(title.title).toBeFalsy();
  }));

  it(`should have as title 'hello!'`, async(() => {
    title.title = 'hello!';
    expect(title.title).toEqual('hello!');
  }));

  it('should render title in a h3 tag', async(() => {
    title.title = 'acme';
    fixture.detectChanges();
    expect(element.querySelector('h3').textContent).toContain('acme');
  }));

  describe('with content', () => {
    let testComponent: TitleTestComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(TitleTestComponent);
      testComponent = fixture.componentInstance;
      element = fixture.nativeElement;
      debugEl = fixture.debugElement;
    }));

    it('should render title with additional content', async(() => {
      fixture.detectChanges();
      expect(element.querySelector('span').textContent).toContain('meta');
    }));
  });
});
