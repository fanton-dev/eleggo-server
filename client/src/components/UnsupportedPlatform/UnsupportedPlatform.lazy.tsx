import React, { lazy, Suspense } from 'react';

const LazyUnsupportedPlatform = lazy(() => import('./UnsupportedPlatform'));

const UnsupportedPlatform = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUnsupportedPlatform {...props} />
  </Suspense>
);

export default UnsupportedPlatform;
