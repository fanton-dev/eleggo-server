import React, { lazy, Suspense } from 'react';

const LazyBluetoothDeviceSelection = lazy(
  () => import('./BluetoothDeviceSelection'),
);

const BluetoothDeviceSelection = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
) => (
  <Suspense fallback={null}>
    <LazyBluetoothDeviceSelection {...props} />
  </Suspense>
);

export default BluetoothDeviceSelection;
