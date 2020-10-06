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

const DEFAULT_KEY = 'mini_fields';

const getKey = (ref: HTMLElement) => {
  if (ref.closest('mini-web-component')) {
    return ref.dataset.minikey || DEFAULT_KEY;
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

  async ngAfterViewInit() {
    const {nativeElement} = this.self;
    await waitForMount(nativeElement);
    const key = getKey(nativeElement);
    this.input = window[key];
  }

}
