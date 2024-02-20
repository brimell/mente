import { Helmet } from 'react-helmet-async';

import { DashboardView } from '../sections/dashboard/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title>mente | overview</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
