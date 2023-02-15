import { CustomError } from '../../../packages/classes';
import { UserInstance, UserSchema } from '../../../packages/types';
import { User } from '../models/User.model';


export const findUserByEmail = async (email: UserSchema['email']) => {
    const user: UserInstance | null = await User.findOne({ email });
    if (!user) {
        throw new Error(CustomError.WRONG_EMAIL.message);
    }
    return user;
};
