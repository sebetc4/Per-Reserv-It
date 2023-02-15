import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import nextAuth from 'next-auth';

import { UserSession } from '../../../packages/types/user.types';
import { SessionStatus } from '../../../packages/types/api.types';
import { handleCredentialsProvider } from '../../../apps/server/providers';
import { handleGoogleProvider } from '../../../apps/server/providers/google.provider';
import { dbConnect } from '../../../apps/server/config';
import { User } from '../../../apps/server/models';
import { SignInBody } from '../../../packages/types';

declare module 'next-auth' {
    interface Session {
        expires: 'string';
        status: SessionStatus;
        user: UserSession | null;
    }
}

export default nextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                return await handleCredentialsProvider(credentials as SignInBody);
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        signIn: async ({ account, profile }) => {
            if (!account) {
                return false;
            }
            switch (account.provider) {
                case 'credentials':
                    return true;
                case 'google':
                    return await handleGoogleProvider(profile, account);
                default:
                    return false;
            }
        },

        jwt: async ({ token, account }) => {
            if (account?.userId) {
                token.sub = account.userId;
            }
            return token;
        },

        session: async ({ session, token }) => {
            await dbConnect();
            const user = await User.findById(token.sub);
            if (!user) {
                session.user = null;
                session.status = SessionStatus.INVALID;
            } else {
                session.status = SessionStatus.VALID;
                session.user = user.getSession();
            }
            return session;
        },
    },
});
