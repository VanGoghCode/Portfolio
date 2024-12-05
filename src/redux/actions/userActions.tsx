import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUserAction = createAsyncThunk(
  'loginUser',
  // async ({ email, password }) => {
  //   const response = await loginUser({ email, password });
  //   return response.data;
  // }
);