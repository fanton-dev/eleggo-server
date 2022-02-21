import React, { lazy, Suspense } from 'react';

const LazyCodeFileExplorer = lazy(() => import('./CodeFileExplorer'));

const CodeFileExplorer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCodeFileExplorer {...props} />
  </Suspense>
);

export default CodeFileExplorer;
