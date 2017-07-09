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
  let width = 800;
  let height = 600;
  if (isFullscreen()) {
    ({ width, height } = electron.screen.getPrimaryDisplay().size);
  }
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width,
    height,
    icon: `${__dirname}/wanna.png`,
  });
  win.loadURL('http://localhost:3000');
}

app.on('ready', () => {
  createWindow();
});
