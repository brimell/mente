import { Helmet } from 'react-helmet-async';

import { OverviewView } from '../sections/overview/view';

export default function ActivityPage() {
  return (
    <>
      <Helmet>
        <title>mente | activity</title>
      </Helmet>

      <OverviewView />
    </>
  );
}
