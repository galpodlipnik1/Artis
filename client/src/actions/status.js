import * as api from '../api/index';

export const dbStatus = async () => {
  try {
    const { data } = await api.dbStatus();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const serverStatus = async () => {
  try {
    const { data } = await api.serverStatus();
    return data;
  } catch (error) {
    console.log(error);
  }
};
