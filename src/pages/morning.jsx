import { Helmet } from 'react-helmet-async';

import { MorningView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title>mente | morning</title>
      </Helmet>

      <MorningView />
    </>
  );
}
