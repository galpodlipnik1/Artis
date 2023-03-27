import * as api from '../api';

export const getPublicImages = async (page) => {
  try {
    const { data } = await api.fetchPublicImages(page);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPublic = async (newImage) => {
  try {
    const { data } = await api.createPublicImage(newImage);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePublicImage = async (id, newLikes) => {
  try {
    const { data } = await api.updatePublicImage(id, newLikes);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePublicImage = async (id) => {
  try {
    await api.deletePublicImage(id);
  } catch (error) {
    console.log(error);
  }
};
