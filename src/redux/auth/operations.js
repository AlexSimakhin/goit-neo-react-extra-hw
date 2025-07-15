import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://connections-api.goit.global',
});

export const token = {
  set(token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    api.defaults.headers.common.Authorization = '';
  },
};

const handleAsyncThunkError = (error, thunkAPI) => {
  const message =
    error.response?.data?.message || error.message || 'Something went wrong';
  return thunkAPI.rejectWithValue(message);
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/logout');
    token.unset();
  } catch (error) {
    return handleAsyncThunkError(error, thunkAPI);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      token.set(persistedToken);
      const { data } = await api.get('/users/current');
      return data;
    } catch (error) {
      token.unset();
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export { api };
