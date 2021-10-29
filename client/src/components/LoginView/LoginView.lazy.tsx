import React, { Suspense, lazy } from 'react';

const LazyLoginView = lazy(() => import('./LoginView'));

const LoginView = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyLoginView {...props} />
  </Suspense>
);

export default LoginView;
