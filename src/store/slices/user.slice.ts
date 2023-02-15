import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UpdateAccountBody, UpdatePasswordBody, UpdateProfileBody, UserSession } from '../../packages/types';
import { api } from '../../services';

type UserState = {
    isLoading: boolean;
    data: UserSession | null;
    error: string | null;
};

const initialState: UserState = {
    isLoading: false,
    data: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserSession(state, action: PayloadAction<any>) {
            state.data = action.payload;
        },
        removeUserData(state) {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        /**
         * Update Account
         */
        builder.addCase(updateAccount.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(updateAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Update Profile
         */
        builder.addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Update Password
         */
        builder.addCase(updatePassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updatePassword.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const updateAccount = createAsyncThunk<any, UpdateAccountBody, { rejectValue: string }>(
    'user/updateAccount',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.updateAccount(body);
            return data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const updateProfile = createAsyncThunk<any, UpdateProfileBody, { rejectValue: string }>(
    'user/updateProfile',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.updateProfile(body);
            return data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const updatePassword = createAsyncThunk<any, UpdatePasswordBody, { rejectValue: string }>(
    'user/updatePassword',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.updatePassword(body);
            return data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { setUserSession, removeUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
