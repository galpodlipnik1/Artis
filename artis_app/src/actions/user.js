import * as api from '../api';

export const signIn = async (formData) => {
  try {
    const { data } = await api.signIn(formData);

    localStorage.setItem('profile', JSON.stringify({ ...data }));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (formData) => {
  try {
    const { data } = await api.signUp(formData);

    localStorage.setItem('profile', JSON.stringify({ ...data }));

    return data;
  } catch (error) {
    console.log(error);
  }
};
