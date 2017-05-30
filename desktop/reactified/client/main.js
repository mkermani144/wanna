const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;

let win;

function createWindow(fullscreen) {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: `${__dirname}/wanna.png`,
  });
  win.loadURL('http://localhost:3000');
}

app.on('ready', () => {
  createWindow();
});
