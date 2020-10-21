
export const flat = (arr, fieldName = 'fields') => arr.reduce((acm, val) =>
  Array.isArray(val[fieldName])
    ? acm.concat({ ...val, [fieldName]: [] }, flat(val[fieldName]))
    : acm.concat(val), []);

export const deepFlat = (arr, fieldName = 'fields') => {
  let result = arr;
  while (true) {
    const iter = flat(result, fieldName);
    if (result.length === iter.length) {
      return result;
    } else {
      result = iter;
    }
  }
};

export default deepFlat;
