import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { SignInResponse } from 'next-auth/react';
import { getSession, signIn, signOut } from 'next-auth/react';
import { CustomError } from '../../packages/classes';
import { SignInBody, SignUpBody, SessionStatus, ForgotPasswordBody, ResetPasswordBody } from '../../packages/types';
import { api } from '../../services';
import { removeUserData, setUserSession } from './user.slice';

type AuthState = {
    isLoading: boolean;
    isChecked: boolean;
    sessionStatus: SessionStatus | null;
    isAuth: boolean;
    error: string | null;
};

const initialState: AuthState = {
    isLoading: false,
    isChecked: false,
    sessionStatus: null,
    isAuth: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthIsChecked(state) {
            state.isChecked = true;
            state.error = null;
        },
        setUserIsAuth(state) {
            state.isChecked = true;
            state.sessionStatus = SessionStatus.VALID;
            state.isAuth = true;
            state.error = null;
        },
        setInvalidSession(state) {
            state.isChecked = true;
            state.isAuth = false;
            state.sessionStatus = SessionStatus.INVALID;
            state.error = CustomError.INVALID_TOKEN.message;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.isChecked = true;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        /**
         * Sign up
         */
        builder.addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Sign in
         */
        builder.addCase(signInWithCredentials.pending, (state, action) => {
            state.isLoading = true;
            state.isAuth = false;
            state.sessionStatus = null;
            state.error = null;
        });
        builder.addCase(signInWithCredentials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.sessionStatus = SessionStatus.VALID;
        });
        builder.addCase(signInWithCredentials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Logout
         */
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.sessionStatus = null;
            state.isAuth = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Check auth
         */
        builder.addCase(checkAuth.pending, (state, action) => {
            state.isLoading = true;
            state.isChecked = false;
            state.sessionStatus = null;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isChecked = true;
            state.sessionStatus = action.payload ? SessionStatus.VALID : null;
            state.isAuth = action.payload;
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Forgot password
         */
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Reset password
         */
        builder.addCase(resetPassword.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const signUp = createAsyncThunk<void, SignUpBody, { rejectValue: string }>(
    'auth/signUp',
    async (body, { rejectWithValue }) => {
        try {
            await api.signUp(body);
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const signInWithCredentials = createAsyncThunk<void, SignInBody, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const res: SignInResponse | undefined = await signIn('credentials', { ...credentials, redirect: false });
            if (!res) {
                throw new Error('Failled to login');
            }
            if (res.error) {
                return rejectWithValue(res.error);
            }
            const session = await getSession();
            if (!session) {
                throw new Error('Failled to get session');
            }
            dispatch(setUserSession(session.user));
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const logout = createAsyncThunk<void, void>('auth/logout', async (_, { dispatch }) => {
    await signOut({ redirect: false });
    dispatch(removeUserData());
});

export const checkAuth = createAsyncThunk<boolean, void, { rejectValue: string }>(
    'auth/checkAuth',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const session = await getSession();
            if (!session) {
                return false;
            }
            if (session.status === SessionStatus.INVALID) {
                await signOut({ redirect: false });
                return false;
            }
            dispatch(setUserSession(session.user));
            return true;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const forgotPassword = createAsyncThunk<any, ForgotPasswordBody, { rejectValue: string }>(
    'auth/forgotPassword',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.forgotPassword(body);
            return data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const resetPassword = createAsyncThunk<
    any,
    { body: ResetPasswordBody; token: string },
    { rejectValue: string }
>('auth/resetPassword', async ({body, token}, { rejectWithValue }) => {
    try {
        const { data } = await api.resetPassword(body, token);
        return data.session;
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data.message);
        }
        throw err;
    }
});

export const { setAuthIsChecked, setUserIsAuth, setAuthError, setInvalidSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
