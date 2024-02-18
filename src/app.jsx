import 'src/global.css';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import MainContextProvider from './contexts/MainContext';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <MainContextProvider>
        <Router />
      </MainContextProvider>
    </ThemeProvider>
  );
}
