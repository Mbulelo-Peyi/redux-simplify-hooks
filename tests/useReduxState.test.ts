import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useReduxState } from '../src/hooks/useReduxState';

// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 10 },
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// Store
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

// Wrapper without JSX
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(Provider, { store, children });

// Test
describe('useReduxState', () => {
  it('reads and updates state', () => {
    const { result } = renderHook(() =>
      useReduxState<number>('counter.value', counterSlice.actions.setCounter, 0),
      { wrapper }
    );

    // Initial state should be the store value, 10, not 0 (default)
    expect(result.current[0]).toBe(10);

    // Set state explicitly to 10 (no change)
    act(() => {
      result.current ;
    });

    expect(result.current[0]).toBe(10);

    // Increment state by 5
    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(15);
  });
});
