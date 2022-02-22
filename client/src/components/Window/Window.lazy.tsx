import React, { lazy, Suspense } from 'react';

const LazyWindow = lazy(() => import('./Window'));

const Window = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWindow {...props} />
  </Suspense>
);

export default Window;
