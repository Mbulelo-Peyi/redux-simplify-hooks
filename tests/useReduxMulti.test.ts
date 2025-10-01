import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider, ProviderProps } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useReduxMulti } from '../src/hooks/useReduxMulti';

// Counter slice
interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// User slice
interface UserState {
  name: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: { name: 'Alice' } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
  },
});

// Wrapper without TSX
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(Provider, { store } as ProviderProps, children);

// Test
describe('useReduxMulti', () => {
  it('selects multiple state slices', () => {
    const { result } = renderHook(() => useReduxMulti(['counter.value', 'user.name']), { wrapper });

    expect(result.current.state['counter.value']).toBe(0);
    expect(result.current.state['user.name']).toBe('Alice');
  });
});
