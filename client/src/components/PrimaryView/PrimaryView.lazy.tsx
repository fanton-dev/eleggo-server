import React, { lazy, Suspense } from 'react';

const LazyPrimaryView = lazy(() => import('./PrimaryView'));

const PrimaryView = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyPrimaryView {...props} />
  </Suspense>
);

export default PrimaryView;
