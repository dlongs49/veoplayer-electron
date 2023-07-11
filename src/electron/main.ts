
import { app, BrowserWindow,Menu,ipcMain,net } from "electron"
import path from 'path'
import {playFunc} from "./control"
const createWindow = () => {
    Menu.setApplicationMenu(null)
    // playFunc(net)

    const win = new BrowserWindow({
        width: 1200,
        height: 850,
        minHeight:850,
        minWidth:1200,
        frame: false,
        icon: path.join(__dirname, '../public/static/images/veoplayer_logo.ico'),
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            nodeIntegration: true
        }
    })
    ipcMain.on("minimize",()=>{
        win.minimize()
    })
    ipcMain.on("maximize",()=>{
        let isMaximized = win.isMaximized()
        if(isMaximized){
            win.restore()
        }else{
            win.maximize()
        }
        win.webContents.send(isMaximized ? 'minimize' : "maximized");
    })
    ipcMain.on("close",()=>{
        win.hide()
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.webContents.openDevTools();
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        win.loadFile('./dist/index.html');
    }
}
app.whenReady().then(() => {
    createWindow()
})
