const fs = require('fs');
const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;

const isFullscreen = () => {
  const data = fs.readFileSync('.config/db', 'utf-8');
  if (data) {
    return JSON.parse(data).appProperties.fullscreen;
  }
  return true;
};

let win;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: `${__dirname}/wanna.png`,
  });
  if (isFullscreen()) {
    win.maximize();
  }
  win.loadURL('http://localhost:3000');
}

app.on('ready', () => {
  createWindow();
});
