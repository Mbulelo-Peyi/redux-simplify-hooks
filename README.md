Excellent — let’s write a **professional `README.md`** for your package `redux-simplify-hooks`:

---

````markdown
# redux-simplify-hooks

> Redux made simple: modern, type-safe React hooks for deeply nested state, actions, and selectors — fully compatible with Redux Toolkit and React 16.8+.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

---

## What is redux-simplify-hooks?

**redux-simplify-hooks** is a lightweight collection of hooks that simplifies working with Redux state in React.  
It provides ergonomic and modern alternatives to `useSelector` and `useDispatch`, allowing you to:

- Select deeply nested state using dot notation.
- Read and write Redux state like React’s `useState()`.
- Bind Redux actions easily with hooks.
- Select multiple state slices at once.

Fully type-safe  
Compatible with **React 16.8+** (Hooks onward)  
Compatible with **Redux Toolkit**  
Supports React 17, 18, 19+  

---

## Installation

First install the required peer dependencies if not already installed:

```bash
npm install react react-dom react-redux @reduxjs/toolkit
````

Then install redux-simplify-hooks:

```bash
npm install redux-simplify-hooks
```

---

## ⚙ Peer Dependencies

| Package          | Version                |
| ---------------- | ---------------------- |
| react            | >= 16.8                |
| react-dom        | >= 16.8                |
| react-redux      | ^7.1.0, ^8.0.0, ^9.0.0 |
| @reduxjs/toolkit | >= 1.0.0               |

---

## Usage

### 1 `useRedux()`

Read nested state using dot-path notation:

```typescript
import { useRedux } from 'redux-simplify-hooks';

const MyComponent = () => {
  const { state, dispatch } = useRedux('user.profile.name');

  return <div>Hello, {state}</div>;
};
```

### 2 `useReduxMulti()`

Select multiple state paths at once:

```typescript
import { useReduxMulti } from 'redux-simplify-hooks';

const { state } = useReduxMulti(['user.profile.name', 'counter.value']);

console.log(state['user.profile.name']);
console.log(state['counter.value']);
```

### 3 `useReduxState()`

Read & write Redux state like React's `useState`:

```typescript
import { useReduxState } from 'redux-simplify-hooks';
import { counterSlice } from './counterSlice';

const [count, setCount] = useReduxState('counter.value', counterSlice.actions.setCounter);

setCount(42);
```

### 4 `useBoundAction()`

Bind Redux actions to dispatch automatically:

```typescript
import { useBoundAction } from 'redux-simplify-hooks';
import { counterSlice } from './counterSlice';

const incrementByAmount = useBoundAction(counterSlice.actions.incrementByAmount);

incrementByAmount(5); // dispatches action
```

---

## Testing

redux-simplify-hooks is fully tested using:

* Jest
* @testing-library/react

```bash
npm run test
```

---

## License

This project is licensed under the **Apache License 2.0**.

© 2025 Mbulelo Phillip Peyi

---

## Motivation

Redux can be powerful but verbose — **redux-simplify-hooks** aims to make Redux feel as simple as React's `useState()` without sacrificing its robustness.

---

## Contributions

PRs and issues are welcome! If you want to contribute, please fork and submit a pull request.

---

