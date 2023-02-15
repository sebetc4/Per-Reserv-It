import { UserSession } from './user.types';

/**
 * Auth
 */

// SingnUp
export type SignUpBody = {
    username: string;
    email: string;
    password: string;
};

// Login
export type SignInBody = {
    email: string;
    password: string;
};

/**
 * Update settings
 */

// Upadte account
export type UpdateAccountBody = {
    username: string;
    email: string;
};

export type UpdateAccountRes = {
    session: UserSession;
};

// Update profile
export type UpdateProfileBody = {
    avatar?: string;
};

export type UpdateProfileRes = {
    session: UserSession;
};

// Update password
export type UpdatePasswordBody = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export type UpdatePasswordRes = {
    session: UserSession;
};

export type ForgotPasswordBody = {
    email: string;
};

export type ResetPasswordBody = {
    newPassword: string;
    confirmPassword: string;
};