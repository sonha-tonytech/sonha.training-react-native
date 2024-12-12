import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string, expiryTime?: number) => {
  const data = {
    value,
    expiry: expiryTime ? new Date().getTime() + expiryTime : undefined,
  };

  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data.', e);
  }
};

const getData = async (key: string) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    if (storedData) {
      const data = JSON.parse(storedData);
      const currentTime = new Date().getTime();

      if (data.expiry && currentTime > data.expiry) {
        await AsyncStorage.removeItem(key);
        console.log('Data expired and removed');
        return null;
      } else {
        return data.value;
      }
    }
    return null;
  } catch (e) {
    console.error('Failed to fetch data.', e);
    return null;
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove data.', e);
  }
};

export {storeData, getData, removeData};
