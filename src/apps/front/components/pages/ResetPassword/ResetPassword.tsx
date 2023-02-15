import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Container } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { resetPasswordSchema } from '../../../../../packages/schemas';

import type { ResetPasswordBody } from '../../../../../packages/types';
import { resetPassword, setAlert } from '../../../../../store';
import { useRouter } from 'next/router';
import { CustomError } from '../../../../../packages/classes';
import { CustomPasswordInput } from '../../inputs/CustomPasswordInput/CustomPasswordInput';

export const PasswordSettings = () => {
    // Hoohs
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Store
    const { error } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        setError,
    } = useForm<ResetPasswordBody>({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (body: ResetPasswordBody) => {
        const token = router.query.token;
        if (typeof token !== 'string') {
            return;
        }
        const res = await dispatch(resetPassword({ body, token }));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: 'Votre mot de passe a été mis à jour.' }));
        } else {
            dispatch(
                setAlert({
                    type: 'error',
                    message: "Erreur lors de la modification de votre mot de passe. Merci d'essayer ultérieurement.",
                })
            );
        }
    };

    return (
        <Container maxWidth='xs'>
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                maxWidth='xs'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid
                    container
                    spacing={3}
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
                </Grid>

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
                    sx={{ marginTop: 4, marginBottom: 2 }}
                    fullWidth
                >
                    Enregistrer les modifications
                </LoadingButton>
            </Box>
        </Container>
    );
};
