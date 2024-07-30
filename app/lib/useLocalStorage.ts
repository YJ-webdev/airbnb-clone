export const useLocalStorage = (key: string) => {
  // State to store our value
  const setItem = (value: undefined) => {
    // Allow value to be set only if it's a string

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem };
};
