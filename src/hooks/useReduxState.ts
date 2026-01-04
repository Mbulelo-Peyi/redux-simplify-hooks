import { useCallback, useRef } from "react";
import { useRedux } from "./useRedux";

export function useReduxState<T>(
  statePath: string, 
  actionCreator: (value: T) => any, 
  defaultValue?: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const { state, dispatch } = useRedux<T>(statePath, defaultValue);
  
  // Keep track of the latest state in a ref to avoid stale closures in useCallback
  const stateRef = useRef(state);
  stateRef.current = state;

  const setState = useCallback((newValue: T | ((prev: T) => T)) => {
    const valueToDispatch = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(stateRef.current) 
      : newValue;
    dispatch(actionCreator(valueToDispatch));
  }, [dispatch, actionCreator]); // state is removed from deps; setState is now stable!

  return [state, setState];
}