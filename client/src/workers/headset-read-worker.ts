addEventListener('message', (event) => {
  console.log('Connected to headset...');
  const headset: BluetoothDevice = event.data.headset;

  while (true) {
    // Replace with current data reading from bluetooth device
    console.log(headset);
    const headsetData = Array(8).fill(Array(60).fill(0));

    postMessage(headsetData);
    break;
  }
});
