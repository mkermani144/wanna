const fs = require('fs');
const path = require('path');
const os = require('os');
const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;

let parentPath = os.homedir();
if (process.env.NODE_ENV === 'development') {
  parentPath = './';
}


const dbPath = path.join(parentPath, '.wanna/db');

const dbExists = () => {
  if (fs.existsSync(dbPath)) {
    return true;
  }
  return false;
};

const createDatabase = () => {
  const wannaDirectoryPath = path.join(parentPath, '.wanna');
  fs.mkdirSync(wannaDirectoryPath);
  const prefill = JSON.stringify({
    tasks: [],
    ideas: [],
    appProperties: {
      showNotYetTasks: true,
      fullscreen: false,
      calendarSystem: 'en-US',
      firstDayOfWeek: 1,
      startupTab: 'tasks',
    },
  });
  fs.writeFileSync(dbPath, prefill);
};

const isFullscreen = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data).appProperties.fullscreen;
};

let win;

function createWindow() {
  if (dbExists() === false) {
    createDatabase();
  }
  let width = 1024;
  let height = 768;
  if (isFullscreen()) {
    ({ width, height } = electron.screen.getPrimaryDisplay().size);
  }
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width,
    height,
    icon: `${__dirname}/icon.png`,
  });
  win.loadURL('http://localhost:3000');
}

app.on('ready', () => {
  createWindow();
});
