import { createTheme, CssBaseline, GlobalStyles, PaletteMode, ThemeProvider } from '@mui/material';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { commonTheme, darkPalette, lightPalette } from '../theme/theme';

interface CustomThemeProvider {
    children: ReactNode;
}

export default function CustomThemeProvider({ children }: CustomThemeProvider) {
    // State
    const [mode, setMode] = useState<PaletteMode>('light');

    // Context
    const ColorModeContext = createContext({ toggleColorMode: () => {} });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                ...commonTheme,
                palette: {
                    mode,
                    ...(mode === 'light' ? lightPalette : darkPalette),
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
