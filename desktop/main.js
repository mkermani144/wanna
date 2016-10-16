const electron = require('electron');
const { app } = electron;
const { ipcMain: ipc } = electron;
const { dialog } = electron;
const { BrowserWindow } = electron;
const { globalShortcut } = electron;
const fs = require('fs');
const { exec } = require('child_process');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadURL(`file://${__dirname}/index.html`);
    // win.webContents.openDevTools()
  win.on('close', () => {
    fs.unlink(`${__dirname}/assets/css/main.css`);
  });
}

app.on('ready', () => {
  exec(`${__dirname}/node_modules/node-sass/bin/node-sass --output-style expanded ${__dirname}/assets/css/main.scss > ${__dirname}/assets/css/main.css`, (err, stdout, stderr) => {
    if (err || stderr) {
      process.exit(1);
      throw err;
    } else {
      createWindow();
      globalShortcut.register('CmdOrCtrl+T', () => {
        win.webContents.send('Add new task');
      });
    }
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipc.on('insert-error', (ev, err) => {
  dialog.showErrorBox('Insertion error',
    `There was an error in inserting your task:\n${err}`);
});
ipc.on('find-error', (ev, err) => {
  dialog.showErrorBox('Find error',
    `There was an error in finding your task:\n${err}`);
});
ipc.on('update-error', (ev, err) => {
  dialog.showErrorBox('Update error',
    `There was an error in updating your task:\n${err}`);
});
ipc.on('remove-error', (ev, err) => {
  dialog.showErrorBox('Remove error',
    `There was an error in removing your task:\n${err}`);
});
