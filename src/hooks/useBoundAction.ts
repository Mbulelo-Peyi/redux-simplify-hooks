import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useBoundAction<Args extends any[]>(
  actionCreator: (...args: Args) => any 
) {
  const dispatch = useDispatch();

  return useCallback((...args: Args) => {
    return dispatch(actionCreator(...args));
  }, [dispatch, actionCreator]);
}