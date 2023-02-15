import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography, Grid, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { CustomPasswordInput, CustomTextField, GoogleButton } from '../..';
import { useAppDispatch } from '../../../hooks';
import { Path, QueryParams, SignInBody } from '../../../../../packages/types';
import { signInSchema } from '../../../../../packages/schemas';
import { CustomError } from '../../../../../packages/classes';
import { setAlert, signInWithCredentials } from '../../../../../store';

import LoginImage from '../../../../../../public/images/login-hotel.jpg';

export const Login = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<SignInBody>({
        resolver: yupResolver(signInSchema),
        mode: 'onTouched',
    });

    // State
    const [showProviderError, setShowProviderError] = useState<boolean>(false);

    // Effects
    useEffect(() => {
        const params = router.query.p;
        switch (params) {
            case QueryParams.EMAIL_ALREADY_EXISTS_WITH_DIFFERENT_PROVIDER:
                setShowProviderError(true);
                break;
            case QueryParams.RESET_PASSWORD_SUCCESS:
                dispatch(setAlert({ type: 'success', message: 'Votre mot de passe a été mis à jour.' }));
                break;
        }
    }, [router.query.p]);

    // Handlers
    const onSubmit = async (data: SignInBody) => {
        showProviderError && setShowProviderError(false);
        const res = await dispatch(signInWithCredentials(data));
        if (res.meta.requestStatus === 'fulfilled') {
            router.replace(Path.HOME);
        } else {
            switch (res.payload) {
                case CustomError.EMAIL_ALREADY_EXISTS_OTHER_PROVIDER.message:
                    setShowProviderError(true);
                    break;
                case CustomError.WRONG_EMAIL.message:
                    setError('email', {
                        type: 'custom',
                        message: "Aucun compte n'est enregistré avec cette adresse e-mail",
                    });
                    break;
                case CustomError.WRONG_PASSWORD.message:
                    setError('password', { type: 'custom', message: 'Mot de passe invalide' });
                    break;
                default:
                    dispatch(
                        setAlert({
                            type: 'error',
                            message: "Erreur lors de la tentative de connecion. Merci d'essayer ultérieurement.",
                        })
                    );
            }
        }
    };

    return (
        <Grid
            container
            maxWidth='xl'
            sx={{ ml: 'auto', mr: 'auto' }}
        >
            <Grid
                item
                xs={6}
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
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
                        variant='h3'
                    >
                        Connexion
                    </Typography>
                    <Typography
                        component='h2'
                        align='center'
                        sx={{
                            mt: 1,
                            mb: 3,
                        }}
                    >
                        Heureux de vous retouver! Connectez-vous pour accéder à votre compte.
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
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
                        <CustomPasswordInput
                            name='password'
                            label='Mot de passe'
                            register={register('password')}
                            errorMessage={errors.password?.message || null}
                        />
                        <Typography
                            component={Link}
                            href={Path.FORGOT_PASSWORD}
                            color='primary'
                            sx={{
                                textDecoration: 'none',
                            }}
                        >
                            Mot de passe oublié?
                        </Typography>
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                            fullWidth
                            size='large'
                        >
                            Se connecter
                        </LoadingButton>
                        <GoogleButton />
                        {showProviderError && (
                            <Typography
                                color='error'
                                sx={{ mt: 2, textAlign: 'center' }}
                            >
                                Un compte est déjà lié à cette adresse e-mail avec une autre méthode de connexion
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
                        <Typography>Vous n'avez pas de compte ?</Typography>
                        <Typography
                            component={Link}
                            href={Path.SIGNUP}
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Inscrivez-vous
                        </Typography>
                    </Box>
                </Container>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    position: 'relative',
                    borderTopLeftRadius: 80,
                    borderBottomLeftRadius: 80,
                    display: 'flex',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={LoginImage}
                    alt='Hotel en bord de mer'
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    placeholder='blur'
                    quality={100}
                />
            </Grid>
        </Grid>
    );
};
