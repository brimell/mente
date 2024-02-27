import { Helmet } from 'react-helmet-async';

import { HeroView } from '@sections/hero/view';

// ----------------------------------------------------------------------

export default function HeroPage() {
  return (
    <>
      <Helmet>
        <title>mente</title>
      </Helmet>

      <HeroView />
    </>
  );
}
