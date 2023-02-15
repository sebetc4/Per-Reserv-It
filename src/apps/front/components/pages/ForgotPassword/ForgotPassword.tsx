import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPasswordBody } from '../../../../../packages/types';
import { Box, Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { CustomTextField } from '../../inputs/CustomTextField/CustomTextField';
import { forgotPassword, setAlert } from '../../../../../store';
import { CustomError } from '../../../../../packages/classes';
import { forgotPasswordSchema } from '../../../../../packages/schemas';

export const ForgotPassword = () => {
    // Hooks
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<ForgotPasswordBody>({
        resolver: yupResolver(forgotPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: ForgotPasswordBody) => {
        const res = await dispatch(forgotPassword(data));
        dispatch(
            setAlert({ type: 'success', message: 'Un email vous a été envoyé pour réinitialiser votre mot de passe.' })
        );
        if (res.meta.requestStatus !== 'fulfilled') {
            switch (res.payload) {
                case CustomError.WRONG_EMAIL.message:
                    setError('email', {
                        type: 'custom',
                        message: "Aucun compte n'est enregistré avec cette adresse e-mail",
                    });
                    break;
            }
        }
    };

    return (
        <Container
            maxWidth='xs'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                component='h1'
                variant='h4'
                sx={{
                    margin: 1,
                }}
            >
                Mot de passe oublié
            </Typography>
            <Typography
                component='h2'
                align='center'
                sx={{
                    marginBottom: 4,
                }}
            >
                Il semblerait que vous avez oublié votre mot de passe. Pour le réinitialiser merci de rentrer l'adresse
                email de votre compte..
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <CustomTextField
                    name='email'
                    label='Adresse e-mail'
                    type='email'
                    register={register('email')}
                    errorMessage={errors.email?.message || null}
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 4, marginBottom: 2 }}
                    fullWidth
                    size='large'
                >
                    Récupérer le mot de passe
                </LoadingButton>
            </Box>
        </Container>
    );
};
