import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operations';
import { handleAsyncThunkError } from '../../utils/asyncThunkHelpers';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/contacts');
      return data;
    } catch (error) {
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await api.post('/contacts', contact);
      return data;
    } catch (error) {
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await api.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, contactData }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/contacts/${contactId}`, contactData);
      return data;
    } catch (error) {
      return handleAsyncThunkError(error, thunkAPI);
    }
  }
);
