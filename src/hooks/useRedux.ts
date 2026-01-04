import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useMemo, useRef } from 'react';
import { getNestedValue } from '../utils/getNestedValue';

export function useRedux<T = any>(statePath?: string, defaultValue?: T) {
  const dispatch = useDispatch();
  // Store defaultValue in a ref so changes to object literals don't break memoization
  const defaultRef = useRef(defaultValue);
  defaultRef.current = defaultValue;

  const selector = useMemo(() => {
    return (state: any) => {
      if (!statePath) return defaultRef.current;
      const val = getNestedValue(state, statePath);
      return val !== undefined ? val : defaultRef.current;
    };
  }, [statePath]); // Removed defaultValue from deps to keep selector stable

  const state = useSelector(selector, shallowEqual);
  return { state: state as T, dispatch };
}