import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { CustomError } from '../../../packages/classes';
import { SessionStatus, UserInstance } from '../../../packages/types';
import { setUserSession } from '../../../store';
import { setAuthIsChecked, setInvalidSession } from '../../../store/slices/auth.slice';
import { User } from '../models';

export const authUser = async (req: NextApiRequest) => {
    const token = await getToken({req})
    if(!token) {
        throw CustomError.UNAUTHORIZED
    } 
    const user: UserInstance | null = await User.findById(token.sub)
    if(!user) {
        throw CustomError.INVALID_TOKEN
    } 
    return user
}

export const requireAuthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => { props: any }
) => {
    store.dispatch(setAuthIsChecked());
    const session = await getSession(context);
    if (session?.status === SessionStatus.VALID) {
        store.dispatch(setUserSession(session.user));
        return cb();
    }
    if (session) {
        store.dispatch(setInvalidSession());
    }
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    };
};

export const requireUnauthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => { props: any }
) => {
    const session = await getSession(context);
    if (session?.status === SessionStatus.VALID) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    session && store.dispatch(setInvalidSession());
    return cb();
};
