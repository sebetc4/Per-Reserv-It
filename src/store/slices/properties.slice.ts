import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { PropertyPreview, PropertyData } from '../../packages/types/properties.types';
import { api } from '../../services';

type PropertiesState = {
    isLoading: boolean;
    data: PropertyPreview[];
    propertiesCount: number;
    error?: string | null;
};

const initialState: PropertiesState = {
    isLoading: false,
    data: [],
    propertiesCount: 0,
    error: null,
};

interface IFetchAllPropertiesParams {
    currentPage: string;
    location: string | null;
    category: string;
    guests: string | null;
}

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProperties.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProperties.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = formatPropertyPreview(action.payload.properties);
            state.propertiesCount = action.payload.propertiesCount;
            state.error = null;
        });
        builder.addCase(fetchProperties.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const fetchProperties = createAsyncThunk<
    { properties: Partial<PropertyData>[]; propertiesCount: number },
    IFetchAllPropertiesParams,
    { rejectValue: string }
>('properties/fetchAll', async ({ currentPage, location, category, guests }, { rejectWithValue }) => {
    try {
        const res = await api.fetchProperties(currentPage, location, category, guests);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data.message);
        }
        throw err;
    }
});

const formatPropertyPreview = (properties: Partial<PropertyData>[]): any => {
    return properties.map((prop: any) => {
        let minPrice = prop.accommodations[0].price;
        prop.accommodations.forEach((accom: any) => {
            if (accom.price < minPrice) {
                minPrice = accom.price;
            }
        });
        prop.minPrice = minPrice;
        delete prop.accommodations;
        return prop;
    });
};

export const {} = propertiesSlice.actions;
export const propertiesReducer = propertiesSlice.reducer;
