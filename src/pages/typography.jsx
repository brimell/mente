import { Helmet } from 'react-helmet-async';

import { TypographyView } from '../sections/typography/view';

// ----------------------------------------------------------------------

export default function TypographyPage() {
  return (
    <>
      <Helmet>
        <title>mente | typography</title>
      </Helmet>

      <TypographyView />
    </>
  );
}
