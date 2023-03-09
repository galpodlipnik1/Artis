import * as api from '../api';

export const getCloud = async () => {
  try {
    const { data } = await api.fetchImages();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createCloud = async (Imagedata) => {
  try {
    const { data } = await api.createImage(Imagedata);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCloud = async (id) => {
  try {
    await api.deleteImage(id);
  } catch (error) {
    console.log(error.message);
  }
};
