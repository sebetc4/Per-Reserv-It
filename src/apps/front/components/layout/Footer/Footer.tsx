import { Box, Container, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React, { RefObject } from 'react';

interface IFooterProps {}

export const Footer = ({}: IFooterProps) => {
    const theme = useTheme();
    return (
        <Box
            component='footer'
            sx={{
                borderTop: 1,
                borderColor: theme.palette.grey[200],
                backgroundColor: theme.palette.grey[100],
            }}
        >
            <Container
                maxWidth='xl'
                sx={{
                    pt: 6,
                    pb: 6,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography>Reserv'It -</Typography>
                    <Link
                        href='https://sebastien-etcheto.com'
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Sébastien ETCHETO
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
