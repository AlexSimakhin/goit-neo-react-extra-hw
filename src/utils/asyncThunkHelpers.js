export const handleAsyncThunkError = (error, thunkAPI) => {
  const message =
    error.response?.data?.message || error.message || 'Something went wrong';
  return thunkAPI.rejectWithValue(message);
};
