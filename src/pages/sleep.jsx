import { Helmet } from 'react-helmet-async';

import { SleepView } from '../sections/sleep/view';

export default function SleepPage() {
  return (
    <>
      <Helmet>
        <title>mente | sleep</title>
      </Helmet>

      <SleepView />
    </>
  );
}
