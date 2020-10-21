
// tslint:disable-next-line: only-arrow-functions
export function ngDebounce(timeout: number) {
  let timeoutRef = null;
  // tslint:disable-next-line: only-arrow-functions
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function debounce(...args) {
      clearTimeout(timeoutRef);
      timeoutRef = setTimeout(() => {
        original.apply(this, args);
      }, timeout);
    };
    return descriptor;
  };
}

export default ngDebounce;
