import { FieldType } from '../model/FieldType.enum';

export const initialValue = (type: FieldType) => {
  if (type === FieldType.CheckBox) {
    return false;
  } else if (type === FieldType.TagBox) {
    return '';
  } else if (type === FieldType.SelectBox) {
    return [];
  } else if (type === FieldType.TextBox) {
    return '';
  } else {
    console.warn('mini-component initialValue unknown type');
    return '';
  }
};

export default initialValue;
