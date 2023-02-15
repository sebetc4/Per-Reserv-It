import axios, { AxiosInstance } from 'axios';
import {
    ForgotPasswordBody,
    ResetPasswordBody,
    SignUpBody,
    UpdateAccountBody,
    UpdateAccountRes,
    UpdatePasswordBody,
    UpdateProfileBody,
    UpdateProfileRes,
} from '../packages/types';

class ApiService {
    api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });
    }
    /**
     * Auth
     */
    signUp(data: SignUpBody) {
        return this.api.post('/auth/signup', data);
    }
    fetchCurrentUserData() {
        return this.api.get('/user');
    }
    forgotPassword(data: ForgotPasswordBody) {
        return this.api.post('/auth/password/forgot', data);
    }
    checkResetPasswordToken(token: string) {
        return this.api.get(`/auth/password/reset/${token}`);
    }
    resetPassword(data: ResetPasswordBody, token: string) {
        return this.api.post(`/auth/password/reset/${token}`, data);
    }


    /**
     * Properties
     */
    fetchProperties(currentPage: string, location: string | null, category: string, guests: string | null) {
        let query = `/properties?page=${currentPage}&category=${category}`;
        if (location) {
            query = query.concat(`&location=${location}`);
        }
        if (guests) {
            query = query.concat(`&guests=${guests}`);
        }
        return this.api.get(query);
    }
    fetchOneProperty(id: string) {
        return this.api.get(`/properties/${id}`);
    }

    /**
     * Update settings
     */
    updateAccount(data: UpdateAccountBody) {
        return this.api.put<UpdateAccountRes>('/user/update/account', data);
    }
    updateProfile(data: UpdateProfileBody) {
        return this.api.put<UpdateProfileRes>('/user/update/profile', data);
    }
    updatePassword(data: UpdatePasswordBody) {
        return this.api.put<UpdateAccountRes>('/user/update/password', data);
    }
}

export const api = new ApiService();
