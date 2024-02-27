import '@/global.css';

import AppRouter from '@routes/sections';
import ThemeProvider from '@theme';
import MainContextProvider from './contexts/MainContext';

import { useScrollToTop } from '@hooks/use-scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <MainContextProvider>
        <AppRouter />
      </MainContextProvider>
    </ThemeProvider>
  );
}
