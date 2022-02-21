import React, { lazy, Suspense } from 'react';

const LazyCodeEditor = lazy(() => import('./CodeEditor'));

const CodeEditor = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCodeEditor {...props} />
  </Suspense>
);

export default CodeEditor;
