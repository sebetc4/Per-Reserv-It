import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { PropertyData } from '../../packages/types/properties.types';
import { api } from '../../services';

type PropertyState = {
    isLoading: boolean;
    data: PropertyData| null;
    error: string | null;
}

const initialState: PropertyState = {
    isLoading: false,
    error: null,
    data: null,
};

export const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOneProperty.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchOneProperty.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.error = null;
            state.data = payload;
        });
        builder.addCase(fetchOneProperty.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const fetchOneProperty = createAsyncThunk<any, string, { rejectValue: string }>(
    'property/fetchOneProperty',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.fetchOneProperty(id);
            return res.data.property;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const {} = propertySlice.actions;
export const propertyReducer =  propertySlice.reducer;
