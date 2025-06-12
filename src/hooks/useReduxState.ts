import { useRedux } from './useRedux';

export function useReduxState<T>(
  statePath: string, 
  actionCreator: (value: T) => any, 
  defaultValue?: T
): [T, (value: T | ((prev: T) => T)) => void] {

  const { state, dispatch } = useRedux<T>(statePath, defaultValue);

  const setState = (newValue: T | ((prev: T) => T)) => {
    const valueToDispatch = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(state)
      : newValue;
    dispatch(actionCreator(valueToDispatch));
  };

  return [state, setState];
}
