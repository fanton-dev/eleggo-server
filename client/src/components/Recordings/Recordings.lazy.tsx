import React, { lazy, Suspense } from 'react';

const LazyRecordings = lazy(() => import('./Recordings'));

const Recordings = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRecordings {...props} />
  </Suspense>
);

export default Recordings;
