import { ThemeProvider } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

const AppWithWrapper = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() =>
    matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  return (
    <ThemeProvider className='app-wrapper' theme={theme}>
      <App />
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <AppWithWrapper />
  </React.StrictMode>,
);
