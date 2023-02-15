import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type CustomPasswordInputProps = {
    name: string;
    label: string;
    register: UseFormRegisterReturn;
    errorMessage: string | null;
};

export const CustomPasswordInput = ({ name, label, register, errorMessage }: CustomPasswordInputProps) => {
    const [showPassword, setShowPasswor] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPasswor((prev) => !prev);

    const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <FormControl
            variant='outlined'
            error={!!errorMessage}
            sx={{
                width: '100%',
            }}
        >
            <InputLabel
                required
                htmlFor='password-input'
            >
                {label}
            </InputLabel>
            <OutlinedInput
                required
                id={`${name}-input`}
                type={showPassword ? 'text' : 'password'}
                {...register}
                fullWidth
                label={label}
                error={!!errorMessage}            
                aria-describedby={`${name}-input-error-text`}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='Modifier la visibilité du mot de passe'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id={`${name}-input-error-text`}>{errorMessage}</FormHelperText>
        </FormControl>
    );
};
