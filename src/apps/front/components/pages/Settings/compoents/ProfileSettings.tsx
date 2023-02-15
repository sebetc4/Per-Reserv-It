import { FormEvent, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Container, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { setAlert, updateProfile } from '../../../../../../store';
import { UpdateProfileBody } from '../../../../../../packages/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { updateProfileSchema } from '../../../../../../packages/schemas';
import { CustomAvatar } from '../../..';

export const ProfileSettings = () => {
    // Hoohs
    const dispatch = useAppDispatch();

    // Store
    const { data: user, isLoading } = useAppSelector((state) => state.user);

    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(user!.avatar!.url);

    // Form
    const {
        register,
        handleSubmit,
        formState: { isDirty, errors, isSubmitting },
        setError,
    } = useForm<UpdateProfileBody>({
        resolver: yupResolver(updateProfileSchema),
        mode: 'onTouched',
        defaultValues: {},
    });

    const handleChangeAvatar = (e: FormEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
            }
        };
        if (!e.currentTarget.files) {
            return;
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    };
    const onSubmit = async (data: UpdateProfileBody) => {
        if (typeof avatar === 'string') {
            const res = await dispatch(updateProfile({ ...data, avatar }));
            if (res.meta.requestStatus === 'fulfilled') {
                dispatch(setAlert({ type: 'success', message: 'Vos modifications ont été enregistrées.' }));
                setAvatar(null);
            } else {
                dispatch(
                    setAlert({
                        type: 'error',
                        message:
                            "Erreur lors de l'enregistrement de vos modifications. Merci d'essayer ultérieurement.",
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
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <IconButton
                            color='primary'
                            aria-label='upload picture'
                            component='label'
                        >
                            <input
                                hidden
                                onChange={handleChangeAvatar}
                                accept='image/*'
                                type='file'
                            />
                            <CustomAvatar
                                username={user!.username}
                                avatarUrl={avatarPreview as string}
                                size={120}
                            />
                        </IconButton>
                    </Box>
                </Grid>

                <LoadingButton
                    size='large'
                    loading={isSubmitting}
                    disabled={isSubmitting || (!isDirty && !avatar)}
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 4, marginBottom: 2 }}
                    loadingPosition='start'
                    startIcon={
                        <SaveOutlinedIcon
                            fontSize='large'
                            sx={{ mb: 0.5 }}
                        />
                    }
                    fullWidth
                >
                    Enregistrer les modifications
                </LoadingButton>
            </Box>
        </Container>
    );
}
