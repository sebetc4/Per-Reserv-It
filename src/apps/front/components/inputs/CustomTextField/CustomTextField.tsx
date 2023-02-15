import { BaseTextFieldProps, Box, Grid, TextField, Typography } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type CustomTextField = {
    name: string;
    label: string;
    register: UseFormRegisterReturn;
    disabled?: boolean;
    errorMessage: string | null;
    type: BaseTextFieldProps['type'];
    autoFocus?: boolean;
};

export const CustomTextField = ({ name, register, errorMessage, ...props }: CustomTextField) => {
    return (
        <Box sx={{width: '100%'}}>
            <TextField
                required
                id={`${name}-input`}
                variant='outlined'
                fullWidth
                {...register}
                error={!!errorMessage}
                helperText={errorMessage}
                {...props}
            />
        </Box>
    );
};
