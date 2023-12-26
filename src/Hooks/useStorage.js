import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      if (!key) {
        throw new Error("A chave é obrigatória.");
      }
  
      const password = await AsyncStorage.getItem(key);
  
      
      if (password === null) {
        return null;
      }
  
      return JSON.parse(password);
    } catch (error) {
      console.error("Erro ao buscar:", error.message);
      return null; 
    }
  };
  

  const saveItem = async (key, value) => {
    try {
      if (!key || value === undefined || value === null) {
        throw new Error("Chave e valor são obrigatórios.");
      }

      let passwords = await getItem(key);

      passwords.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.error("Erro ao salvar:", error.message);
    }
  };

  const removeItem = async (key, item) => {
    try {
      if (!key || item === undefined || item === null) {
        throw new Error("Chave e item são obrigatórios.");
      }

      let passwords = await getItem(key);

      let myPasswords = passwords.filter((password) => password !== item);

      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));

      return myPasswords;
    } catch (error) {
      console.error("Erro ao deletar:", error.message);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
