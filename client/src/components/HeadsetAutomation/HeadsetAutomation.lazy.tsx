import React, { lazy, Suspense } from 'react';

const LazyHeadsetAutomation = lazy(() => import('./HeadsetAutomation'));

const HeadsetAutomation = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHeadsetAutomation {...props} />
  </Suspense>
);

export default HeadsetAutomation;
