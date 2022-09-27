const setStorage = (key: string, value: Record<string, any>) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

const getStorage = <ReturnType extends Record<string, any>>(key: string): ReturnType => {
  return JSON.parse(sessionStorage.getItem(key) || "{}");
}

export {setStorage, getStorage}