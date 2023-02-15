import type { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../../../packages/classes';
import { isDevEnv } from '../../../packages/constants';
import {  SignUpBody, UpdateAccountBody, UpdatePasswordBody, UpdateProfileBody } from '../../../packages/types';
import { signUpSchema, updateAccountSchema, updatePasswordSchema, updateProfileSchema } from '../../../packages/schemas';
import { cloudinary } from '../config';
import { User } from '../models';
import { authUser, catchError, onSuccess, validBody } from '../utils';

export const signUp = catchError(async (req, res) => {
    const { email, username, password } = await validBody<SignUpBody>(signUpSchema, req);
    await User.create({ email, username, password, authProvider: 'credentials' });
    onSuccess({ message: 'User is registered' }, 201, res);
});

export const updateAccount = catchError(async (req, res) => {
    const { email, username } = await validBody<UpdateAccountBody>(updateAccountSchema, req);
    const user = await authUser(req);
    if (user.isEqualValues({ email, username })) {
        throw CustomError.BAD_REQUEST;
    }
    user.email = email;
    user.username = username;
    await user.save();
    const session = user.getSession();
    onSuccess({ session }, 200, res);
});

export const updateProfile = catchError(async (req, res) => {
    const { avatar } = await validBody<UpdateProfileBody>(updateProfileSchema, req);
    const user = await authUser(req);
    if (avatar) {
        user.avatar.public_id && cloudinary.destroy(user.avatar.public_id);
        const result = await cloudinary.upload(avatar, {
            folder: `reservit/${isDevEnv ? 'development' : 'production'}/avatar`,
            with: 150,
            crop: 'scale',
        });
        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }
    await user.save();
    const session = user.getSession();
    onSuccess({ session }, 200, res);
});

export const updatePassword = catchError(async (req, res) => {
    const { currentPassword, newPassword } = await validBody<UpdatePasswordBody>(updatePasswordSchema, req);
    const user = await authUser(req);
    console.log(user);
    if (user.authProvider !== 'credentials') {
        throw CustomError.BAD_REQUEST;
    }
    if (!(await user.isValidPassword(currentPassword))) {
        throw CustomError.WRONG_PASSWORD;
    }
    user.password = newPassword;
    await user.save();
    onSuccess({ message: 'Password is changed' }, 200, res);
});
