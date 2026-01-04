import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNestedValue } from "../utils/getNestedValue";
import { shallowEqual } from "react-redux";

export function useReduxMulti(paths: string[] = []) {
  const dispatch = useDispatch();
  
  // Memoize the path string to keep the selector identity stable
  const pathsKey = paths.join(',');

  const state = useSelector((rootState: any) => {
    return paths.reduce((acc, path) => {
      acc[path] = getNestedValue(rootState, path);
      return acc;
    }, {} as Record<string, any>);
  }, (prev, next) => {
    // Faster than JSON.stringify, safer than default ref check
    const keys = Object.keys(next);
    if (keys.length !== Object.keys(prev).length) return false;
    return keys.every(key => shallowEqual(prev[key], next[key]));
  });

  return { state, dispatch };
}