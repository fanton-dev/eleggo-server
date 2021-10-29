import React, { lazy, Suspense } from 'react';

const LazyOtherLoginOptions = lazy(() => import('./OtherLoginOptions'));

const OtherLoginOptions = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOtherLoginOptions {...props} />
  </Suspense>
);

export default OtherLoginOptions;
