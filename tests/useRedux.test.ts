import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRedux } from '../src/hooks/useRedux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 100 },
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});


const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});


const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(Provider, { store, children });



describe('useRedux', () => {
  it('selects nested state', () => {
    const { result } = renderHook(() => useRedux<number>('counter.value'), { wrapper });
    expect(result.current.state).toBe(100);
  });

  it('returns defaultValue if path does not exist', () => {
    const { result } = renderHook(() => useRedux<number>('counter.nonexistent', 999), { wrapper });
    expect(result.current.state).toBe(999);
  });
});
