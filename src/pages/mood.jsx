import { Helmet } from 'react-helmet-async';

import { OverviewView } from '../sections/overview/view';

export default function MoodPage() {
  return (
    <>
      <Helmet>
        <title>mente | mood</title>
      </Helmet>

      <OverviewView />
    </>
  );
}
