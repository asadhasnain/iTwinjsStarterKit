import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@itwin/itwinui-react/styles.css';
import './styles.css';
import { AppWithWrapper } from './AppWithWrapper';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppWithWrapper />
  </React.StrictMode>,
);
