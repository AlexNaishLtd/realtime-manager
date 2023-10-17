import type { Reducer } from 'react';
import { useMemo, useReducer } from 'react';

type State<T> = {
  search: string;
  isCreating: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  item: T;
};

type Action<T> =
  | { type: 'creating' }
  | { type: 'edit'; data: T }
  | { type: 'deleting'; data: T }
  | { type: 'search'; data: string }
  | { type: 'creating-clear' }
  | { type: 'edit-clear' }
  | { type: 'deleting-clear' }
  | { type: 'search-clear' };

const initialState = {
  search: '',
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  item: null
};

function reducer<T>(state: State<T>, action: Action<T>) {
  switch (action.type) {
    case 'creating':
      return { ...state, isCreating: true };
    case 'creating-clear':
      return { ...state, isCreating: false };
    case 'edit':
      return { ...state, isEditing: true, item: action.data };
    case 'edit-clear':
      return { ...state, isEditing: false, item: null };
    case 'search':
      return { ...state, search: action.data };
    case 'search-clear':
      return { ...state, search: '' };
    case 'deleting':
      return { ...state, isDeleting: true, item: action.data };
    case 'deleting-clear':
      return { ...state, isDeleting: false, item: null };
    default: {
      throw new Error();
    }
  }
}

export function useListPage<T = any>() {
  const [state, dispatch] = useReducer<Reducer<State<T | null>, Action<T | null>>>(reducer, initialState);
  const actions = useMemo(() => {
    return {
      setCreating: () => dispatch({ type: 'creating' }),
      clearCreating: () => dispatch({ type: 'creating-clear' }),
      setEdit: (item: T) => dispatch({ type: 'edit', data: item }),
      clearEdit: () => dispatch({ type: 'edit-clear' }),
      setSearch: (value: string) => dispatch({ type: 'search', data: value }),
      clearSearch: () => dispatch({ type: 'search-clear' }),
      setDeleting: (item: T) => dispatch({ type: 'deleting', data: item }),
      clearDeleting: () => dispatch({ type: 'deleting-clear' })
    };
  }, [dispatch]);

  return {
    state,
    actions
  };
}
