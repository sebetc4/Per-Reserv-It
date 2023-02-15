import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPasswordBody } from '../../../../../packages/types';
import { Box, Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../../hooks';
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
        if (res.meta.requestStatus !== 'fulfilled') {
            switch (res.payload) {
                case CustomError.WRONG_EMAIL.message:
                    setError('email', {
                        type: 'custom',
                        message: "Aucun compte n'est enregistré avec cette adresse e-mail",
                    });
                    break;
            }
        } else {
            dispatch(
                setAlert({
                    type: 'success',
                    message: 'Un email vous a été envoyé pour réinitialiser votre mot de passe.',
                })
            );
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                component='h1'
                variant='h3'
            >
                Mot de passe oublié
            </Typography>
            <Typography
                align='center'
                sx={{
                    mt: 1,
                    mb: 3,
                    maxWidth: '600px',
                }}
            >
                Il semble que vous ayez oublié votre mot de passe. Un e-mail contenant un lien de réinitialisation de
                mot de passe sera envoyé. Veuillez saisir l'adresse email associée à votre compte.
            </Typography>
            <Container
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                maxWidth='xs'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    gap: 2,
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
                        fullWidth
                        size='large'
                        sx={{mt: 1}}
                    >
                        Envoyer
                    </LoadingButton>
            </Container>
        </Container>
    );
};
