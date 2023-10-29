import { IUsers } from '@/components/TableUsers';
import { Api } from '@/services/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [] as IUsers[],
  error: '' as string | undefined,
  usersChangedTotal: 0,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await Api.get<IUsers[]>('/user');
  return response.data;
});

const fetchUsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [action.payload, ...state.users];
      state.usersChangedTotal = state.usersChangedTotal <= 5 ? state.usersChangedTotal + 1 : state.usersChangedTotal;
    },
    removeUser: (state, action) => {
      const userIdToRemove = action.payload;
      state.users = state.users.filter((user) => user.id !== userIdToRemove);
      state.usersChangedTotal = state.usersChangedTotal <= 5 ? state.usersChangedTotal + 1 : state.usersChangedTotal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.usersChangedTotal = 0;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message; // Armazene a mensagem de erro
    });
  },
});

export const { addUser, removeUser } = fetchUsersSlice.actions;
export default fetchUsersSlice.reducer;
