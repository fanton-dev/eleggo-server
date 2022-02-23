import React, { lazy, Suspense } from 'react';

const LazyNavbarIcon = lazy(() => import('./NavbarIcon'));

const NavbarIcon = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNavbarIcon {...props} />
  </Suspense>
);

export default NavbarIcon;
