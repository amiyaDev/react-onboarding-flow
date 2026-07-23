import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['divider'];
  }
  interface PaletteOptions {
    border?: PaletteOptions['divider'];
  }
}

export const COLORS = {
  primary: '#4F46E5',
  primaryHover: '#4338CA',
  background: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  success: '#22C55E',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
} as const;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.primary,
      dark: COLORS.primaryHover,
      contrastText: '#FFFFFF',
    },
    success: {
      main: COLORS.success,
    },
    background: {
      default: COLORS.background,
      paper: COLORS.card,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
    border: COLORS.border,
    divider: COLORS.border,
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1.125rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontSize: '1rem', color: COLORS.textSecondary, fontWeight: 400 },
    subtitle2: { fontSize: '0.875rem', color: COLORS.textSecondary, fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.background,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.95rem',
          boxShadow: 'none',
        },
        sizeLarge: {
          padding: '14px 28px',
          fontSize: '1rem',
        },
        containedPrimary: {
          boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px 0 rgba(79, 70, 229, 0.35)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        notchedOutline: {
          borderColor: COLORS.border,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.06)',
          border: `1px solid ${COLORS.border}`,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `1px solid ${COLORS.border}`,
        },
      },
    },
  },
});

export default theme;
