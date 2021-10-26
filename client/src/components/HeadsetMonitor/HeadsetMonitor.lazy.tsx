import React, { lazy, Suspense } from 'react';

const LazyHeadsetMonitor = lazy(() => import('./HeadsetMonitor'));

const HeadsetMonitor = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHeadsetMonitor {...props} />
  </Suspense>
);

export default HeadsetMonitor;
