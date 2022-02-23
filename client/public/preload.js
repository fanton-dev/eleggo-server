const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ['toDiscordRPC', 'toCodeRunner'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});
