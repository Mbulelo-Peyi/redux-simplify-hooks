export function getNestedValue(obj: any, path: string): any {
  if (!path) return obj;
  const keys = path.split(/[.[\]]+/).filter(Boolean);
  return keys.reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    const isIndex = /^\d+$/.test(key);
    return isIndex ? acc[Number(key)] : acc[key];
  }, obj);
}