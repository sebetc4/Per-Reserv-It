import { InstanceOfWithDates, WithId } from './common.types';

export type UserSchema = {
    authProvider: 'credentials' | 'google';
    username: string;
    email: string;
    password?: string;
    avatar: AvatarType;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
};

export type AvatarType = {
    url: string | null;
    public_id: string | null;
};

export type UserInstance = InstanceOfWithDates<UserSchema> & {
    getSession: () => UserSession;
    isValidPassword: (id: UserSchema['password']) => Promise<boolean>;
    isEqualValues: (values: Partial<UserSchema>) => boolean;
    getResetPasswordToken: () => string
};

export type User = WithId<UserSchema>;
export type UserSession = Omit<User, 'password' | 'resetPasswordToken' | 'resetPasswordTokenExpire'>;
