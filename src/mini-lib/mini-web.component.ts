import { AfterViewInit, Component, ElementRef } from '@angular/core';

import { IField } from 'mini/model/IField.model';

const waitForMount = (ref: HTMLElement) => new Promise((res) => {
  const interval = setInterval(() => {
    if (document.contains(ref)) {
      clearInterval(interval);
      res();
    }
  }, 100);
});

const DEFAULT_KEY = 'miniFields';

const getKey = (ref: HTMLElement) => {
  let closest = null;
  // tslint:disable-next-line: no-conditional-assignment
  if (closest = ref.closest('mini-web-component')) {
    // tslint:disable-next-line: no-string-literal
    return closest.dataset['minikey'] || DEFAULT_KEY;
  } else {
    return DEFAULT_KEY;
  }
};

interface IMiniInput {
  fields: IField[];
  handler: () => Promise<any>;
  fallback: () => void;
  change: (v: any) => void;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-web-component-internal',
  template: `<mini-component *ngIf="input"
    [fields]="input.fields"
    [handler]="input.handler"
    [fallback]="input.fallback"
    [change]="input.change"
  ></mini-component>
  `,
})
export class MiniWebComponent implements AfterViewInit {

  public input: IMiniInput = null;

  constructor(private self: ElementRef) { }

  ngAfterViewInit() {
    const {nativeElement} = this.self;
    waitForMount(nativeElement).then(() => {
      // tslint:disable-next-line: no-string-literal
      const key = nativeElement.dataset['minikey'] || getKey(nativeElement);
      this.input = window[key] as any;
    });
  }

}
