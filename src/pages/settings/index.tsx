import Head from 'next/head';
import { Settings } from '../../apps/front/components';
import { requireAuthUser } from '../../apps/server/utils';
import { wrapper } from '../../store/store';

export default function UpdateProfilePage() {
    return (
        <>
            <Head>
                <title>Paramètres - Reserv'It</title>
            </Head>
            <Settings />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});
