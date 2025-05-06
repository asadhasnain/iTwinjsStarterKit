import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IconButton, ThemeProvider } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';
import './styles.css';
import { ThemeContext } from './Theme/ThemeContext';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

const AppWithWrapper = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() =>
    matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme} className='custom-theme'>
        <App />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <AppWithWrapper />
  </React.StrictMode>,
);
