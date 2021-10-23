import React, { lazy, Suspense } from 'react';

const LazyRegisterForm = lazy(() => import('./RegisterForm'));

const RegisterForm = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyRegisterForm {...props} />
  </Suspense>
);

export default RegisterForm;
