const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('Timer.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// Listen for the IPC message from the renderer process
ipcMain.on('api-time-is-up', (event, arg) => {
  // Handle the IPC message, for example, show a pop-up dialog
  dialog.showMessageBox({
    type: 'info',
    title: 'Timer',
    message: "Time's up",
  });
});