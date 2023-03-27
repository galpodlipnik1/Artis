import * as api from '../api';

export const getPresets = async () => {
  try {
    const { data } = await api.fetchPresets();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPreset = async (preset) => {
  try {
    const { data } = await api.createPreset(preset);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePreset = async (id) => {
  try {
    await api.deletePreset(id);
  } catch (error) {
    console.log(error);
  }
};
