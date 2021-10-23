import React, { lazy, Suspense } from 'react';

const LazyLoginForm = lazy(() => import('./LoginForm'));

const LoginForm = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyLoginForm {...props} />
  </Suspense>
);

export default LoginForm;
