import React, { lazy, Suspense } from 'react';

const LazyRecordingOptions = lazy(() => import('./RecordingOptions'));

const RecordingOptions = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRecordingOptions {...props} />
  </Suspense>
);

export default RecordingOptions;
