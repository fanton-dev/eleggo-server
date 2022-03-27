import React, { lazy, Suspense } from 'react';

const LazyRegisterView = lazy(() => import('./RegisterView'));

const RegisterView = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRegisterView {...props} />
  </Suspense>
);

export default RegisterView;
