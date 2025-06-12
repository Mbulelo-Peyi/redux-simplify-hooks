export function getNestedValue(obj: any, path: string): any {
  if (!path) return obj;

  return path.split('.').reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined;

    const arrayMatch = key.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, arrKey, index] = arrayMatch;
      return acc[arrKey]?.[Number(index)];
    }

    return acc?.[key];
  }, obj);
}
