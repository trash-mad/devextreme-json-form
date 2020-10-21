import { IEntity } from 'mini/model/IEntity.model';

import deepEqual from 'deepequal';
import deepCopy from 'deepcopy';

import {get, set} from 'lodash';
import { Input, OnChanges, SimpleChanges } from '@angular/core';

import ngDebounce from './utils/ngDebounce';

// tslint:disable: member-ordering

/**
 * Дефолтные значения для IEntity
 */
const defaultProps: Partial<IEntity> = {
  className: '',
  columns: '',
  phoneColumns: '',
  tabletColumns: '',
  desktopColumns: '',
  isDisabled: () => false,
  isVisible: () => true,
  isInvalid: () => null,
  change: ({v}) => console.log({v}),
  object: {},
  name: '',
  readonly: false,
  defaultValue: null,
};

/**
 * Поля, не доступные управляемому компоненту
 */
type exclude = 'name'
  | 'change'
  | 'object'
  | 'type'
  | 'readonly'
  | 'isInvalid';

type v = string
  | boolean[]
  | string[]
  | number[]
  | boolean
  | number;

/**
 * Базовый класс поля. Позволяет обернуть IEntity
 * в удобную абстракцию
 */
export class ManagedField implements Omit<IEntity, exclude>, OnChanges {

  /**
   * Входной параметр для инициализации
   */
  @Input()
  set entity(v: IEntity) {
    this.provideEntity(v);
  }

  /**
   * Имя поля json объекта
   */
  private name = '';
  private object = null;
  private change = (v) => null;
  private isInvalid = (v) => null;
  private readonly = false;

  /**
   * Если ввод не верный, к значению поля присваивается строка
   */
  public invalid: string = null;

  /**
   * Вычисляемые поля для компонента
   */
  public value = null;
  public visible = true;
  public disabled = false;

  /**
   * Прямой проброс из объекта entity
   */
  public className = '';
  public title = '';
  public description = '';
  public columns = '';
  public phoneColumns = '';
  public tabletColumns = '';
  public desktopColumns = '';
  public defaultValue: string | number | boolean | string[] = '';
  public items: string | number | boolean | string[] = '';

  /**
   * Поля, специфичные для исключений, не попавших в абстракцию
   */
  public radioValue = '';

  constructor() {
    this.onChange = this.onChange.bind(this);
    this.onChangeNow = this.onChangeNow.bind(this);
    this.provideEntity = this.provideEntity.bind(this);
  }

  /**
   * Тот же onChangeNow, но с оптимизацией на обработку
   * последнего из неприрывной чреды вызовов - используйте
   * при обработке ввода в реальном времени из текстовых полей
   * (onkeypress)
   */
  @ngDebounce(800)
  public onChange(value: v) {
    console.log('onChange');
    this.onChangeNow(value);
  }

  /**
   * Получает на вход не объект, а значение. Вызывает
   * коллбек сhanged, который летит из One компонента,
   * если были обнаружены изменения
   */
  public onChangeNow(value: v) {
    if (this.readonly) {
      return;
    } else {
      const copy = deepCopy(this.object);
      set(copy, this.name, value);
      this.invalid = this.isInvalid(copy);
      if (this.invalid !== null) {
        return;
      } else if (!deepEqual(this.object, copy)) {
        this.change(copy);
      }
    }
  }

  /**
   * Метод, вызываемый после загрузки и доступный
   * к переопределению
   */
  protected mfOnInit() { }

  /**
   * Если в компоненте все же потребуется
   * использование метода жизненного цикла
   * OnChanges...
   */
  protected mfOnChanges(changes: SimpleChanges) { }

  /**
   * Получает объект на вход от One компонента
   */
  protected provideEntity(entity: IEntity) {

    entity = Object.assign({}, defaultProps, entity);

    this.name = entity.name;
    this.object = entity.object;
    this.change = entity.change;
    this.invalid = entity.isInvalid(entity.object);

    this.value = get(entity.object, entity.name);
    this.visible = entity.isVisible(entity.object);
    this.disabled = entity.isDisabled(entity.object);

    this.className = entity.className;
    this.title = entity.title;
    this.description = entity.description;
    this.columns = entity.columns;
    this.phoneColumns = entity.phoneColumns;
    this.tabletColumns = entity.tabletColumns;
    this.desktopColumns = entity.desktopColumns;
    this.defaultValue = entity.defaultValue;
    this.radioValue = entity.radioValue;
    this.items = entity.items;

  }

  ngOnChanges(changes: SimpleChanges) {
    const {entity} = changes;
    const {isFirstChange} = entity;
    if (isFirstChange) {
      this.mfOnInit();
    }
    this.mfOnChanges(changes);
  }

}
