const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require('path');
const isDev = require('electron-is-dev');
const discordClient = require('discord-rich-presence')('893155192529367110');

const io = require('socket.io')(3001);

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      experimentalFeatures: true,
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js'), // use a preload script
    },
  });
  isDev && mainWindow.webContents.openDevTools();
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

discordClient.updatePresence({
  state: 'Just exploring',
  startTimestamp: Date.now(),
  largeImageKey: 'eleggo',
  instance: true,
});

ipcMain.on('toDiscordRPC', (event, args) => {
  discordClient.updatePresence({
    state: args.state,
    details: args.details,
    startTimestamp: Date.now(),
    largeImageKey: 'eleggo',
    instance: true,
  });
});

io.on('connection', (socket) => {
  ipcMain.on('toCodeRunner', (event, args) => {
    socket.send(args.code);
  });
});
