import { Account } from 'next-auth';
import { QueryErrors, UserInstance } from '../../../packages/types';
import { dbConnect } from '../config';
import { User } from '../models/User.model';

export const handleGoogleProvider = async (profile: any, account: Account): Promise<boolean | string> => {
    await dbConnect();
    const user: UserInstance | null = await User.findOne({ email: profile.email });
    if (!user) {
        const newUser = await User.create({
            authProvider: 'google',
            username: profile.name,
            email: profile.email,
            avatar: { url: profile.picture! },
        });
        account.userId = newUser.id;
        return true;
    }
    if (user.authProvider === 'google') {
        account.userId = user.id;
        return true;
    }
    return `/login?error=${QueryErrors.EMAIL_ALREADY_EXISTS}`;
};
