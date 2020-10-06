import { Component, Input, ApplicationRef, AfterViewChecked } from '@angular/core';
import { IField } from 'mini/model/IField.model';
import { IEntity } from 'mini/model/IEntity.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-component',
  template: `
    <ng-container *ngIf="hasObject">
      <ng-container *ngFor="let entity of entities;">
        <ng-container [ngSwitch]="entity.type">

          <!--ng-container *ngSwitchCase="'expansion'">
            <mini-expansion
              [columns]="entity.columns"
              [phoneColumns]="entity.phoneColumns"
              [tabletColumns]="entity.tabletColumns"
              [desktopColumns]="entity.desktopColumns">
              <mini-component
                [handler]="object" [fields]="entity.fields"
                [change]="onChange">
              </mini-component>
            </mini-expansion>
          </ng-container-->

          <ng-container *ngSwitchCase="'group'">
            <mini-group
              [columns]="entity.columns"
              [phoneColumns]="entity.phoneColumns"
              [tabletColumns]="entity.tabletColumns"
              [desktopColumns]="entity.desktopColumns">
              <mini-component
                [handler]="object" [fields]="entity.fields"
                [change]="onChange">
              </mini-component>
            </mini-group>
          </ng-container>

          <ng-container *ngSwitchCase="'text'">
            <mini-text-field [entity]="entity">
            </mini-text-field>
          </ng-container>

          <ng-container *ngSwitchCase="'tag-box'">
            <mini-tagbox-field [entity]="entity">
            </mini-tagbox-field>
          </ng-container>

          <div *ngSwitchDefault>
            {{'Unknown field: ' + stringify(entity)}}
          </div>

        </ng-container>
      </ng-container>
    </ng-container>
  `
})
export class MiniComponent implements AfterViewChecked {

  /**
   * Объект, который выводится на форму,
   * должен задаваться только в handler
   * и ngOnChanges
   */
  public object: () => Promise<any> | any = null;

  /**
   * handler должен исполняться только
   * у корневой ноды и только один раз
   */
  protected isRootNode = false;

  /**
   * Проверяет, возможен ли рендеринг. Если нода
   * корневая, то handler необходимо исполнить.
   */
  get hasObject() {
    if (this.object instanceof Promise) {
      return false;
    } else if (typeof this.object === 'function') {
      return false;
    } else if (this.object === null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Массив полей, выводимый в компоненте
   */
  @Input() fields: IField[];

  /**
   * Массив полей, подключеных к one
   * компоненту
   */
  get entities(): IEntity[] {
    const tmp = this.fields.map((f) => ({
      ...f, object: this.object,
      change: this.onChange,
    }));
    return tmp.slice(0);
  }

  /**
   * Коллбек. Вызывается после изменения и передает измененный
   * объект прикладному программисту через вышестоящий one
   */
  @Input() change = (object) => console.log({object});

  /**
   * Коллбек, вызываемый если исполнить handler не удалось
   */
  @Input() fallback = (e) => console.error('mini.component handler resolve error', e);

  constructor(private appRef: ApplicationRef) {
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Разрешает обработчик у корневой ноды,
   * при чем только один раз
   */
  async ngAfterViewChecked() {
    if (this.isRootNode) {
      return;
    } else if (typeof this.object === 'function') {
      const result = this.object();
      if (result instanceof Promise) {
        try {
          this.object = await result;
        } catch (e) {
          this.fallback(e);
        }
      } else {
        this.object = result;
      }
      this.isRootNode = true;
    }
  }

  /**
   * Обновляет текущий объект и идет выше по древу
   */
  public onChange(obj) {
    this.object = obj;
    this.change(obj);
    if (this.isRootNode) {
      this.appRef.tick();
    }
  }

  /**
   * Проброс сериализатора в представление
   */
  stringify = (v) => JSON.stringify(v);

  /**
   * Позволяет загружать данные в компонент
   */
  @Input()
  set handler(v: () => any | Promise<any>) {
    this.object = v;
  }

}
