import { Helmet } from 'react-helmet-async';

import { SignupView } from '../sections/signup';

// ----------------------------------------------------------------------

export default function HeroPage() {
  return (
    <>
      <Helmet>
        <title>mente | signup</title>
      </Helmet>

      <SignupView />
    </>
  );
}
