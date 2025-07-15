/**
 * Handles errors in async thunk actions by extracting a meaningful error message
 * and returning a rejected value that can be used by Redux Toolkit.
 *
 * @param {Error|Object} error - The error object from the failed request
 * @param {Object} thunkAPI - The thunk API object provided by createAsyncThunk
 * @returns {Object} A rejected value with the error message
 *
 * @example
 * // Usage in an async thunk
 * export const fetchData = createAsyncThunk(
 *   'data/fetch',
 *   async (_, thunkAPI) => {
 *     try {
 *       const response = await api.get('/data');
 *       return response.data;
 *     } catch (error) {
 *       return handleAsyncThunkError(error, thunkAPI);
 *     }
 *   }
 * );
 */
export const handleAsyncThunkError = (error, thunkAPI) => {
  const message =
    error.response?.data?.message || error.message || 'Something went wrong';
  return thunkAPI.rejectWithValue(message);
};
