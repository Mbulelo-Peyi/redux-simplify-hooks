import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useBoundAction } from '../src/hooks/useBoundAction';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(Provider, { store, children });


describe('useBoundAction', () => {
  it('dispatches bound action', () => {
    const { result } = renderHook(() => useBoundAction(counterSlice.actions.incrementByAmount), { wrapper });

    act(() => {
      result.current(5);
    });

    expect(store.getState().counter.value).toBe(5);
  });
});
