export const useLocalStorage = (key: string) => {
  // State to store our value
  const setItem = (value: any) => {
    // Allow value to be set only if it's a string

    window.localStorage.setItem(key, JSON.stringify(value));

    return { setItem };
  };
};
