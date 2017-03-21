const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win

// Set the path where recordings will be saved
app.setPath('userData', __dirname + '/saved_recordings')

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/audio_video.html'),
        protocol: 'file:',
        slashes: true
    }))
    // win.openDevTools()
}

app.on('ready', createWindow)
