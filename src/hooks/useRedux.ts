import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { getNestedValue } from '../utils/getNestedValue';

export function useRedux<T = any>(statePath?: string, defaultValue?: T) {
  const dispatch = useDispatch();

  const selector = useMemo(() => {
    return (state: any) => {
      if (!statePath) {
        // If no path specified, don't return full state — return defaultValue instead
        return defaultValue;
      }
      const val = getNestedValue(state, statePath);
      return val !== undefined ? val : defaultValue;
    };
  }, [statePath, defaultValue]);

  const selectedState = useSelector(selector);

  return { state: selectedState as T, dispatch };
}
