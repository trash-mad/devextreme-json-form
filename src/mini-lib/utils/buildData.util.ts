
// tslint:disable: variable-name

/**
 * Если handler у mini-component возвращает объект без полей...
 */
export const buildData = (fields = [], filler: (t: string) => any = (t) => '', _obj = {}) => fields.map((field) => {
  if (field.fields) {
    buildData(field.fields, filler, _obj);
  } else if (field.name && field.type) {
    _obj[field.name] = field.defaultValue || filler(field.type);
  }
  return _obj;
}).shift();
