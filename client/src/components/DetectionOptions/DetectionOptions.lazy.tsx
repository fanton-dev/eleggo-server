import React, { lazy, Suspense } from 'react';

const LazyDetectionOptions = lazy(() => import('./DetectionOptions'));

const DetectionOptions = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDetectionOptions {...props} />
  </Suspense>
);

export default DetectionOptions;
