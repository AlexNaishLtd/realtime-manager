import _debounce from 'lodash/debounce';

export const useDebounced = <F extends (...args: any[]) => any>(func: F) => {
  return _debounce(func, 250, {
    trailing: true
  });
};
