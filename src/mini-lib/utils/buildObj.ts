import { IField } from '../model/IField.model';
import initialValue from './initialValue';
import deepFlat from './deepFlat';

/**
 * Строит объект-заглушку исходя из представленных
 * полей mini-component
 */
export const buildObj = (fields: IField[]) => {
  const obj = {};
  if (fields) {
    deepFlat(fields, 'fields').forEach((f) => {
      if (f.name && f.type) {
        obj[f.name] = initialValue(f.type);
      }
    });
  }
  return obj;
};

export default buildObj;
