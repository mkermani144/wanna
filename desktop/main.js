const electron = require('electron');
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, frame: false});
  win.loadURL(`file://${__dirname}/index.html`);
	win.webContents.openDevTools();
}

app.on('ready', createWindow);
