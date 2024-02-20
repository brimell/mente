import { Helmet } from 'react-helmet-async';

import { SettingsView } from '../sections/settings/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title>mente | settings</title>
      </Helmet>

      <SettingsView />
    </>
  );
}
