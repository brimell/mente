import { Helmet } from 'react-helmet-async';

import { OverviewView } from '../sections/overview/view';

export default function SleepPage() {
  return (
    <>
      <Helmet>
        <title>mente | sleep</title>
      </Helmet>

      <OverviewView />
    </>
  );
}
