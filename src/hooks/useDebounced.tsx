import _debounce from 'lodash/debounce';

export const useDebounced = (func: (...args: any) => any) => {
  return _debounce(func, 250, {
    trailing: true
  });
};
