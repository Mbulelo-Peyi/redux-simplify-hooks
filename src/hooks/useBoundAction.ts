import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { AnyAction } from 'redux';

export function useBoundAction<Args extends any[]>(actionCreator: (...args: Args) => AnyAction) {
  const dispatch = useDispatch();

  return useCallback((...args: Args) => {
    dispatch(actionCreator(...args));
  }, [dispatch, actionCreator]);
}
