import { getNestedValue } from '../src/utils/getNestedValue';

describe('getNestedValue', () => {
  const state = {
    user: {
      profile: { name: 'John', age: 30 },
      todos: [{ title: 'Task 1' }, { title: 'Task 2' }]
    }
  };

  test('gets simple nested value', () => {
    expect(getNestedValue(state, 'user.profile.name')).toBe('John');
  });

  test('gets array index value', () => {
    expect(getNestedValue(state, 'user.todos[1].title')).toBe('Task 2');
  });

  test('returns undefined for invalid path', () => {
    expect(getNestedValue(state, 'user.address.city')).toBeUndefined();
  });

  test('returns whole object when path is empty', () => {
    expect(getNestedValue(state, '')).toBe(state);
  });

  test('handles null intermediary', () => {
    expect(getNestedValue(null, 'user.profile.name')).toBeUndefined();
  });
});
