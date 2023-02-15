import Head from 'next/head';
import { ForgotPassword } from '../../apps/front/components';
import { requireUnauthUser } from '../../apps/server/utils';
import { wrapper } from '../../store/store';

export default function ForgotPasswordPage() {
    return (
        <>
            <Head>
                <title>Mot de passe oublié- Reserv'It</title>
            </Head>
            <ForgotPassword />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnauthUser(store, context, () => ({ props: {} }));
});
