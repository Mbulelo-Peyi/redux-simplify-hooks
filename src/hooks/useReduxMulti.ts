import { useRedux } from './useRedux';

export function useReduxMulti(paths: string[] = []) {
  const dispatch = useRedux().dispatch;

  const states = paths.map(path => {
    const { state } = useRedux(path);
    return [path, state];
  });

  const state = Object.fromEntries(states);

  return { state, dispatch };
}
