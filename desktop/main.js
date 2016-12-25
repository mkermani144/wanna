const electron = require('electron');
const { app } = electron;
const { ipcMain: ipc } = electron;
const { dialog } = electron;
const { BrowserWindow } = electron;
const { globalShortcut } = electron;
const fs = require('fs');
const { exec } = require('child_process');
const crypto = require('crypto');
const Datastore = require('nedb');

const db = new Datastore({
  filename: `${__dirname}/settings.db`,
  afterSerialization: (object) => {
    const cipher = crypto.createCipher('aes256', 'sample-key');
    return (cipher.update(object, 'utf8', 'hex') + cipher.final('hex'));
  },
  beforeDeserialization: (object) => {
    const decipher = crypto.createDecipher('aes256', 'sample-key');
    return (decipher.update(object, 'hex', 'utf8') + decipher.final('utf8'));
  },
  autoload: true,
});

let win;

function createWindow(fullscreen) {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
  });
  win.loadURL(`file://${__dirname}/index.html`);
  if (process.argv[2] === 'debug') {
    win.webContents.openDevTools();
  }
  win.on('close', () => {
    fs.unlink(`${__dirname}/assets/css/main.css`);
  });
  if (fullscreen) {
    BrowserWindow.getFocusedWindow().maximize();
  }
}

app.on('ready', () => {
  exec(`${__dirname}/node_modules/node-sass/bin/node-sass --output-style expanded ${__dirname}/assets/css/main.scss > ${__dirname}/assets/css/main.css`, (err, stdout, stderr) => {
    if (err || stderr) {
      process.exit(1);
      throw err;
    } else {
      db.find(
        { name: 'settings' },
        {},
        (errInner, settings) => {
          if (errInner) {
            dialog.showErrorBox('Find error',
              `There was an error in finding your task:\n${err}`);
          } else if (settings.length === 0) {
            db.insert({
              name: 'settings',
              notyet: true,
              fullscreen: false,
            }, () => {
              db.find(
                { name: 'settings' },
                { fullscreen: 1, _id: 0 },
                (errInner2, settingsInner) => {
                  if (errInner2) {
                    dialog.showErrorBox('Find error',
                      `There was an error in finding your task:\n${err}`);
                  } else {
                    createWindow(settingsInner[0].fullscreen);
                    globalShortcut.register('CmdOrCtrl+T', () => {
                      win.webContents.send('Add new task');
                    });
                    globalShortcut.register('CmdOrCtrl+I', () => {
                      win.webContents.send('Add new idea');
                    });
                  }
                }
              );
            });
          } else {
            db.find(
              { name: 'settings' },
              { fullscreen: 1, _id: 0 },
              (errInner2, settingsInner) => {
                if (errInner2) {
                  dialog.showErrorBox('Find error',
                    `There was an error in finding your task:\n${err}`);
                } else {
                  createWindow(settingsInner[0].fullscreen);
                  globalShortcut.register('CmdOrCtrl+T', () => {
                    win.webContents.send('Add new task');
                  });
                  globalShortcut.register('CmdOrCtrl+I', () => {
                    win.webContents.send('Add new idea');
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

app.on('browser-window-focus', () => {
  globalShortcut.register('CmdOrCtrl+T', () => {
    win.webContents.send('Add new task');
  });
  globalShortcut.register('CmdOrCtrl+I', () => {
    win.webContents.send('Add new idea');
  });
});

app.on('browser-window-blur', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
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
