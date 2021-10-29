import React, { lazy, Suspense } from 'react';

const LazyBluetoothConnectionOptions = lazy(() => import('./BluetoothConnectionOptions'));

const BluetoothConnectionOptions = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBluetoothConnectionOptions {...props} />
  </Suspense>
);

export default BluetoothConnectionOptions;
