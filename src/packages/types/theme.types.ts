declare module '@mui/material/styles' {
    interface TypographyVariants {
        logo: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        logo?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        logo: true;
    }
}

export interface IColorTheme {
    primary: {
        main: string;
    };
    secondary: {
        main: string;
    };
}
