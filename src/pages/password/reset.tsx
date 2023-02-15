import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { ResetPassword } from '../../apps/front/components';

import { SessionStatus } from '../../packages/types';
import { api } from '../../services';
import { setInvalidSession, wrapper } from '../../store';

type ResetPasswordPageProps = {
 tokenIsValid: boolean
}

export default function ResetPasswordPage({ tokenIsValid }: ResetPasswordPageProps) {
    return (
        <>
            <Head>
                <title>Réinitialisation du mot de passe - Reserv'It</title>
            </Head>
            <ResetPassword tokenIsValid={tokenIsValid}/>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
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
    if (typeof context.query.t !== 'string') {
        return { props: { tokenIsValid: false } };
    }
    try {
        await api.checkResetPasswordToken(context.query.t);
        return { props: { tokenIsValid: true } };
    } catch {
        return { props: { tokenIsValid: false } };
    }
});
