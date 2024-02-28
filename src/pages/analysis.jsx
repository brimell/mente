import { Helmet } from 'react-helmet-async';

import { OverviewView } from '../sections/overview/view';

export default function AnalysisPage() {
  return (
    <>
      <Helmet>
        <title>mente | analysis</title>
      </Helmet>

      <OverviewView />
    </>
  );
}
