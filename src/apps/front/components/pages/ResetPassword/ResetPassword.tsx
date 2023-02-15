import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Button, Container, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useAppDispatch } from '../../../hooks';
import { resetPasswordSchema } from '../../../../../packages/schemas';

import { Path, QueryParams, ResetPasswordBody } from '../../../../../packages/types';
import { resetPassword, setAlert } from '../../../../../store';
import { useRouter } from 'next/router';
import { CustomPasswordInput } from '../../inputs/CustomPasswordInput/CustomPasswordInput';
import { useState } from 'react';
import Link from 'next/link';
import { CustomError } from '../../../../../packages/classes';

type ResetPasswordProps = {
    tokenIsValid: boolean;
};

export const ResetPassword = ({ tokenIsValid: initialValueTokenIsValid }: ResetPasswordProps) => {
    // Hoohs
    const dispatch = useAppDispatch();
    const router = useRouter();

    // State
    const [tokenIsValid, setTokenIsValid] = useState(initialValueTokenIsValid);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<ResetPasswordBody>({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (body: ResetPasswordBody) => {
        const token = router.query.t;
        if (typeof token !== 'string') {
            return;
        }
        const res = await dispatch(resetPassword({ body, token }));
        if (res.meta.requestStatus === 'fulfilled') {
            router.push(`${Path.LOGIN}?p=${QueryParams.RESET_PASSWORD_SUCCESS}`);
        } else {
            console.log(res.payload);
            switch (res.payload) {
                case CustomError.INVALID_RESET_PASSWORD_TOKEN.message:
                    setTokenIsValid(false);
                    break;
                default:
                    dispatch(
                        setAlert({
                            type: 'error',
                            message:
                                "Erreur lors de la modification de votre mot de passe. Merci d'essayer ultérieurement.",
                        })
                    );
            }
        }
    };

    return tokenIsValid ? (
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
                Réinitialisation du mot de passe
            </Typography>
            <Typography
                align='center'
                sx={{
                    mt: 1,
                    mb: 3,
                    maxWidth: '600px',
                }}
            >
                Veuillez entrer votre nouveau mot de passe dans les champs prévus à cet effet. Nous vous recommandons
                également de ne pas utiliser le même mot de passe pour plusieurs comptes.
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
                <CustomPasswordInput
                    name='password'
                    label='Mot de passe'
                    register={register('newPassword')}
                    errorMessage={errors.newPassword?.message || null}
                />
                <CustomPasswordInput
                    name='password'
                    label='Mot de passe'
                    register={register('confirmPassword')}
                    errorMessage={errors.confirmPassword?.message || null}
                />

                <LoadingButton
                    loading={isSubmitting}
                    disabled={isSubmitting || !isDirty}
                    size='large'
                    type='submit'
                    variant='contained'
                    loadingPosition='start'
                    startIcon={
                        <SaveOutlinedIcon
                            fontSize='large'
                            sx={{ mb: 0.5 }}
                        />
                    }
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Enregistrer
                </LoadingButton>
            </Container>
        </Container>
    ) : (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography>
                Le lien de récupération de votre mot de passe n'est plus valide. Veuillez cliquer sur le bouton
                ci-dessous pour en obtenir un nouveau.
            </Typography>
            <Button
                component={Link}
                href={Path.FORGOT_PASSWORD}
                variant='contained'
                sx={{ mt: 3 }}
            >
                Obtenir un nouveau lien
            </Button>
        </Container>
    );
};
