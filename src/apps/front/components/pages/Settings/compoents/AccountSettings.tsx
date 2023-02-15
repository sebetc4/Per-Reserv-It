import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Container } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { updateAccount, setAlert } from '../../../../../../store';
import { UpdateAccountBody } from '../../../../../../packages/types';
import { updateAccountSchema } from '../../../../../../packages/schemas';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { CustomTextField } from '../../..';

export const AccountSettings = () => {
    // Hoohs
    const dispatch = useAppDispatch();

    // Store
    const { data: user } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<UpdateAccountBody>({
        resolver: yupResolver(updateAccountSchema),
        mode: 'onTouched',
        defaultValues: { username: user!.username, email: user!.email },
    });

    const onSubmit = async (data: UpdateAccountBody) => {
        if (user?.email !== data.email || user?.username !== data.username) {
            const res = await dispatch(updateAccount(data));
            if (res.meta.requestStatus === 'fulfilled') {
                dispatch(setAlert({ type: 'success', message: 'Vos modifications ont été enregistrées.' }));
            } else {
                dispatch(
                    setAlert({
                        type: 'error',
                        message:
                            "Erreur lors de l'enregistrement de vos modifications'. Merci d'essayer ultérieurement.",
                    })
                );
            }
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
                    <CustomTextField
                        name='username'
                        label='Pseudo'
                        type='text'
                        register={register('username')}
                        error={errors.username}
                    />
                    <CustomTextField
                        disabled={user?.authProvider !== 'credentials'}
                        name='email'
                        label='Adresse e-mail'
                        type='email'
                        register={register('email')}
                        error={errors.email}
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
}
