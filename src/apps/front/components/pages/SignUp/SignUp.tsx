import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Typography, Container, Grid } from '@mui/material';

import { useRouter } from 'next/router';
import { Path, SignUpBody } from '../../../../../packages/types';
import { CustomPasswordInput, CustomTextField, GoogleButton } from '../..';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setAlert, signUp } from '../../../../../store';

import SignUpImage from '../../../../../../public/images/signup-hotel.jpg';
import { signUpSchema } from '../../../../../packages/schemas';
import { CustomError } from '../../../../../packages/classes';

export const SignUp = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<SignUpBody>({
        resolver: yupResolver(signUpSchema),
        mode: 'onTouched',
    });

    // Handlers
    const onSubmit = async (data: SignUpBody) => {
        const res = await dispatch(signUp(data));
        router.replace('/login');
        if (res.meta.requestStatus === 'fulfilled') {
            router.replace('/login');
        } else {
            switch (res.payload) {
                case CustomError.EMAIL_ALREADY_EXISTS.message:
                    setError('email', { type: 'custom', message: 'Un compte est déjà lié à cette adresse e-mail.' });
                    break;
                default:
                    dispatch(
                        setAlert({
                            type: 'error',
                            message: "Erreur lors de la tentative de connexion. Merci d'essayer ultérieurement.",
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
                        Créer un compte
                    </Typography>
                    <Typography
                        component='h2'
                        align='center'
                        sx={{
                            mt: 1,
                            mb: 3,
                        }}
                    >
                        Vous cherchez un hébergement ou vous avez un hébergement à proposer? Rejoignez notre communauté.
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
                            name='username'
                            label='Pseudo'
                            type='text'
                            register={register('username')}
                            errorMessage={errors.username?.message || null}
                        />
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
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{mt: 1}}
                        >
                            S'inscrire
                        </LoadingButton>
                        <GoogleButton />
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
                        <Typography>Vous avez déjà un compte ?</Typography>
                        <Typography
                            component={Link}
                            href={Path.LOGIN}
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Connectez-vous
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
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={SignUpImage}
                    alt='Hotel en bord de mer'
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                    placeholder='blur'
                    quality={100}
                />
            </Grid>
        </Grid>
    );
};
