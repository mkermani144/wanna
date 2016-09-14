const electron = require('electron')
const { app } = electron
const { ipcMain: ipc } = electron
const { dialog } = electron
const { BrowserWindow } = electron
const sass = require('node-sass')
const fs = require('fs')

var win

function compileSass() {
  sass.render({
    file: 'css/main.scss',
    outFile: 'css/main.css',
    outputStyle: 'comporessed'
  }, (err, result) => {
    fs.writeFile('css/main.css', result.css, err => {
      console.log(err)
    })
  })
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadURL(`file://${__dirname}/index.html`)
    // win.webContents.openDevTools()
  win.on('close', () => {
    fs.unlink(__dirname + '/css/main.css')
  })
}

app.on('ready', () => {
  compileSass()
  createWindow()
})

ipc.on('insert-error', (ev, err) => {
  dialog.showErrorBox('Insertion error',
    `There was an error in inserting your task:\n${err}`)
})
