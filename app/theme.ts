import { alpha, createTheme } from "@mui/material/styles";

/**
 * The visual tokens below mirror the values already used by the page CSS.
 * CSS custom properties are declared in globals.css so native controls and MUI
 * portals (menus and dialogs) receive the same values.
 */
export const designTokens = {
  color: {
    night: "#1b2a3a",
    nightDeep: "#121e2b",
    lamp: "#e8a94c",
    lampDarker: "#dc9c3a",
    cream: "#f2ede3",
    rose: "#c97b84",
    sage: "#8ca88f",
  },
  radius: {
    card: 16,
    section: 20,
    pill: 100,
  },
  transition: "180ms ease",
} as const;

const { color, radius } = designTokens;
const baseTheme = createTheme();
const shadows = [...baseTheme.shadows] as typeof baseTheme.shadows;

shadows[1] = "0 8px 20px rgb(0 0 0 / 12%)";
shadows[4] = "0 8px 20px rgb(0 0 0 / 18%)";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: color.lamp,
      dark: color.lampDarker,
      contrastText: color.nightDeep,
    },
    secondary: {
      main: color.rose,
    },
    success: {
      main: color.sage,
    },
    background: {
      default: color.night,
      paper: color.nightDeep,
    },
    text: {
      primary: color.cream,
      secondary: alpha(color.cream, 0.6),
      disabled: alpha(color.cream, 0.4),
    },
    divider: alpha(color.cream, 0.12),
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-plex-serif), serif",
      fontWeight: 500,
      lineHeight: 1.08,
      letterSpacing: "-0.01em",
    },
    h2: {
      fontFamily: "var(--font-plex-serif), serif",
      fontWeight: 500,
    },
    h3: {
      fontFamily: "var(--font-plex-serif), serif",
      fontWeight: 500,
    },
    h4: {
      fontFamily: "var(--font-plex-serif), serif",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "var(--font-plex-serif), serif",
      fontWeight: 500,
    },
    button: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 600,
      fontSize: "0.9375rem",
      textTransform: "none",
    },
    caption: {
      fontFamily: "var(--font-plex-mono), monospace",
      fontSize: "0.6875rem",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: radius.card,
  },
  shadows,
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 560,
      lg: 1080,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 46,
          borderRadius: radius.pill,
          padding: theme.spacing(1.5, 3.25),
          gap: "1ch",
          transition: `transform ${designTokens.transition}, box-shadow ${designTokens.transition}, background-color ${designTokens.transition}`,
          "&:hover": {
            transform: "translateY(-1px)",
          },
          "&.Mui-disabled": {
            color: alpha(theme.palette.text.primary, 0.4),
            backgroundColor: alpha(theme.palette.text.primary, 0.08),
          },
          "&.MuiButton-containedPrimary:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: theme.shadows[4],
          },
          "&.MuiButton-outlined": {
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.divider,
              backgroundColor: alpha(theme.palette.common.white, 0.08),
              boxShadow: theme.shadows[1],
              transform: "translateY(-2px)",
            },
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.875rem",
        }),
        input: ({ theme }) => ({
          "&::placeholder": {
            color: theme.palette.text.disabled,
            opacity: 1,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.pill,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.primary.main, 0.5),
            borderWidth: 1,
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.text.primary, 0.12),
          },
        }),
        input: {
          padding: "12px 18px",
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: "var(--font-plex-mono), monospace",
          fontSize: "0.78125rem",
          padding: "8px 38px 8px 16px",
        },
        icon: ({ theme }) => ({
          color: theme.palette.text.secondary,
          right: 13,
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          marginTop: theme.spacing(1),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: radius.card,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: "var(--font-plex-mono), monospace",
          fontSize: "0.78125rem",
          padding: theme.spacing(1, 2),
          "&:hover, &.Mui-selected:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.14),
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          height: "auto",
          borderRadius: radius.pill,
          backgroundColor: alpha(theme.palette.secondary.main, 0.15),
          color: theme.palette.secondary.main,
          "& .MuiChip-label": {
            padding: "3px 10px",
          },
          "&.MuiChip-sizeSmall .MuiChip-label": {
            fontFamily: "var(--font-plex-mono), monospace",
            fontSize: "0.6875rem",
            lineHeight: 1.2,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          },
        }),
        colorPrimary: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
          color: theme.palette.primary.main,
        }),
        colorSuccess: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.success.main, 0.16),
          color: theme.palette.success.main,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: radius.card,
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
          "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.35),
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: radius.section,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          textDecorationColor: "transparent",
          "&:hover": {
            textDecorationColor: "currentColor",
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
  },
});
