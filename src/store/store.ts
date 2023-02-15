import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { isDevEnv } from '../packages/constants';
import * as reducers from './slices';

const combinedReducer = combineReducers(reducers);

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
            auth: {
                ...action.payload.auth,
                isChecked: state?.auth.isChecked || action.payload.auth.isChecked,
                isAuth: state?.auth.isAuth || action.payload.auth.isAuth,
                error: action.payload.auth.error || state?.auth.error
            },
            user: {
                ...action.payload.user,
                data: action.payload.user.data || state?.user.data,
                error: action.payload.user.error || state?.user.error
            },
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer, devTools: isDevEnv });

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type AppState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore, { debug: false });
