const fs = require('fs');
const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;

const dbExists = () => {
  const dbPath = '.config/db';
  if (fs.existsSync(dbPath)) {
    return true;
  }
  return false;
};

const createDatabase = () => {
  fs.mkdirSync('./.config');
  const prefill = JSON.stringify({
    tasks: [],
    ideas: [],
    appProperties: {
      showNotYetTasks: true,
      fullscreen: true,
      calendarSystem: 'en-US',
      firstDayOfWeek: 1,
    },
  });
  fs.writeFileSync('.config/db', prefill);
};

const isFullscreen = () => {
  const data = fs.readFileSync('.config/db', 'utf-8');
  return JSON.parse(data).appProperties.fullscreen;
};

let win;

function createWindow() {
  if (dbExists() === false) {
    createDatabase();
  }
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
