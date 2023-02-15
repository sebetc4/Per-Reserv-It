import Head from 'next/head';
import { Login } from '../../apps/front/components';
import { wrapper } from '../../store/store';
import { setAuthError } from '../../store/slices/auth.slice';
import { QueryErrors } from '../../packages/types/query.types';
import { CustomError } from '../../packages/classes';
import { requireUnauthUser } from '../../apps/server/utils';

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Connexion - Reserv'it</title>
            </Head>
            <Login />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    switch (context.query.error) {
        case QueryErrors.EMAIL_ALREADY_EXISTS:
            store.dispatch(setAuthError(CustomError.EMAIL_ALREADY_EXISTS.message));
            break
    }
    return requireUnauthUser(store, context, () => ({ props: {} }));
});
