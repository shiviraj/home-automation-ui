const setStorage = (key: string, value: Record<string, any>) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string): Record<string, any> => {
  return JSON.parse(sessionStorage.getItem(key) || "{}")
}

export {setStorage, getStorage}