import { alpha } from '@mui/material/styles';

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export function palette(mode = 'light') {
  const primary = () => {
    const light = '#A5A58D';
    const dark = '#6B705C';
    return {
      light,
      dark,
      main: mode === 'light' ? light : dark,
      contrastText: '#FFFFFF',
    };
  };

  const secondary = () => {
    const light = '#cb997e';
    const dark = '#9D6F56';

    return {
      light,
      dark,
      main: mode === 'light' ? light : dark,
      contrastText: '#FFFFFF',
    };
  };

  const info = () => {
    const light = '#2196F3';
    const dark = '#1976D2';

    return {
      light,
      dark,
      main: mode === 'light' ? light : dark,
      contrastText: '#FFFFFF',
    };
  };

  const success = () => {
    const light = '#4CAF50';
    const dark = '#388E3C';

    return {
      light,
      dark,
      main: mode === 'light' ? light : dark,
      contrastText: '#FFFFFF',
    };
  };

  const warning = () => {
    const light = '#FFAB00';
    const dark = '#B76E00';

    return {
      light,
      dark,
      main: mode === 'light' ? light : dark,
      contrastText: grey[800],
    };
  };

  const error = () => {
    const light = '#FF5630';
    const dark = '#B71D18';

    return {
      light,
      dark,
      main: mode === 'light' ? light : dark,
      contrastText: '#FFFFFF',
    };
  };

  const action = {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  };
  return {
    mode,
    primary: primary(),
    secondary: secondary(),
    info: info(),
    success: success(),
    warning: warning(),
    error: error(),
    divider: alpha(grey[500], 0.2),
    action: { ...action },
    text: {
      primary: mode === 'dark' ? grey[300] : grey[800],
      secondary: mode === 'dark' ? grey[400] : grey[600],
      disabled: mode === 'dark' ? grey[600] : grey[500],
    },
    background: {
      default: mode === 'light' ? '#f0efeb' : '#DDBEA9',
      paper: mode === 'light' ? '#F8F6F2' : grey[800],
      neutral: mode === 'dark' ? grey[700] : grey[200],
    },
  };
}
