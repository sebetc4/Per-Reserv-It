import Head from 'next/head';
import { SignUp } from '../../apps/front/components';
import { requireUnauthUser } from '../../apps/server/utils';
import { wrapper } from '../../store/store';

export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Inscription - Reserv'It</title>
            </Head>
            <SignUp />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnauthUser(store, context, () => ({ props: {} }));
});
