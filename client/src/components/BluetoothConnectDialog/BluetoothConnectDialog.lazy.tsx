import React, { lazy, Suspense } from 'react';

const LazyBluetoothConnectDialog = lazy(
  () => import('./BluetoothConnectDialog'),
);

const BluetoothConnectDialog = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyBluetoothConnectDialog {...props} />
  </Suspense>
);

export default BluetoothConnectDialog;
