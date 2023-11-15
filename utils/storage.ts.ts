export const setStorage = (key: string, obj: any) => {
  if (Array.isArray(obj))
    localStorage.setItem(key, JSON.stringify(obj));
  else
    localStorage.setItem(key, obj);
}

export const getStorage = (key: string) => {
  const res = localStorage.getItem(key);
  if (JSON.parse(res!)) {
    return JSON.parse(res!);
  }

  return localStorage.getItem(key);
}
