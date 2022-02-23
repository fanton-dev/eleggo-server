import React, { lazy, Suspense } from 'react';

const LazyComponentTitle = lazy(() => import('./ComponentTitle'));

const ComponentTitle = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyComponentTitle {...props} />
  </Suspense>
);

export default ComponentTitle;
