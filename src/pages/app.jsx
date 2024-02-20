import { Helmet } from 'react-helmet-async';

import { OverviewView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title>mente | overview</title>
      </Helmet>

      <OverviewView />
    </>
  );
}
