import { IUsers } from '@/components/TableUsers';
import { Api } from '@/services/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [] as IUsers[],
  error: '' as string | undefined,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await Api.get<IUsers[]>('/user');
  return response.data;
});

const fetchUsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message; // Armazene a mensagem de erro
    });
  },
});

export default fetchUsersSlice.reducer;
