const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/shortcuts.html'),
        protocol: 'file:',
        slashes: true
    }))
    // win.openDevTools()
}

ipcMain.on('openFile', (event, path) => {
    const {dialog} = require('electron')
    const fs = require('fs')
    dialog.showOpenDialog((fileNames) => {
        if (fileNames === undefined) {
            console.log('No file selected.')
        } else {
            readFile(fileNames[0])
        }
    })

    function readFile(filepath) {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                alert(err.message)
                return
            }

            // handle file content
            event.sender.send('fileData', data)
        })
    }
})

app.on('ready', createWindow)
