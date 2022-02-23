import React, { lazy, Suspense } from 'react';

const LazyDetectionModelsList = lazy(() => import('./DetectionModelsList'));

const DetectionModelsList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDetectionModelsList {...props} />
  </Suspense>
);

export default DetectionModelsList;
