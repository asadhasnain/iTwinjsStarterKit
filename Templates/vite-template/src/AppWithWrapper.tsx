import { ThemeProvider, IconButton } from '@itwin/itwinui-react';
import * as React from 'react';
import App from './App';

export const AppWithWrapper = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  return (
    <ThemeProvider className='app-wrapper' theme={theme}>
      <IconButton
        className='theme-toggle'
        styleType='borderless'
        aria-label='Toggle theme'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌞' : '🌙'}
      </IconButton>
      <App />
    </ThemeProvider>
  );
};
