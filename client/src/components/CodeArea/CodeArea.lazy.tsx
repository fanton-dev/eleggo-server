import React, { lazy, Suspense } from 'react';

const LazyCodeArea = lazy(() => import('./CodeArea'));

const CodeArea = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCodeArea {...props} />
  </Suspense>
);

export default CodeArea;
