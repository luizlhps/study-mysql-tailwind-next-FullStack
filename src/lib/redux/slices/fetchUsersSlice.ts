import { IRootUser, IUsers } from '@/components/TableUsers';
import { Api } from '@/services/axiosConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [] as IUsers[],
  error: '' as string | undefined,
  usersChangedTotal: 0,
  totalUsers: 0,
  limit:0,
  page:0
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async ({ limit, skip }: { limit: number; skip: number }) => {
    const response = await Api.get<IRootUser>(`/user?limit=${limit}&skip=${skip}`);
    return response.data;
  }
);

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
    updateUser: (state, action) => {
      const userIdToUpdate = action.payload.id;

      const changedState = state.users.map((item) => {
        if (item.id === userIdToUpdate) {
          return action.payload;
        }
        return item;
      });

      state.users = changedState;
      state.usersChangedTotal = state.usersChangedTotal <= 5 ? state.usersChangedTotal + 1 : state.usersChangedTotal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.customer;
      state.totalUsers = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.usersChangedTotal = 0;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export const { addUser, removeUser, updateUser } = fetchUsersSlice.actions;
export default fetchUsersSlice.reducer;
