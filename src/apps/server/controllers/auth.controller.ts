import { NextApiRequest, NextApiResponse } from 'next';
import { ForgotPasswordBody, ResetPasswordBody, UserInstance } from '../../../packages/types';
import { forgotPasswordSchema, resetPasswordSchema } from '../../../packages/schemas';
import { sendResetPasswordEmail } from '../config';
import { findUserByEmail } from '../queries';
import { catchError, hashData, onSuccess, validBody } from '../utils';
import { CustomError } from '../../../packages/classes';
import { User } from '../models';

export const forgotPassword = catchError(async (req, res) => {
    const { email } = await validBody<ForgotPasswordBody>(forgotPasswordSchema, req);
    const user = await findUserByEmail(email);
    const resetToken = user.getResetPasswordToken();
    const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;
    try {
        await sendResetPasswordEmail({ email: user.email, username: user.username, resetUrl });
        onSuccess({ message: 'Email sent' }, 200, res);
    } catch (err) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        user.save();
        throw err;
    }
});

export const resetPassword = catchError(async (req, res) => {
    const { newPassword } = await validBody<ResetPasswordBody>(resetPasswordSchema, req);
    const token = req.query.resetToken;
    if (typeof token !== 'string') {
        throw CustomError.BAD_REQUEST;
    }
    const resetPasswordToken = hashData(token);
    const user: UserInstance | undefined | null = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        throw CustomError.BAD_REQUEST;
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    onSuccess({ message: 'Password reset success' }, 200, res);
});
