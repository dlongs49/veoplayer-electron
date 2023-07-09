
import { app, BrowserWindow,Menu,ipcMain } from "electron"
const createWindow = () => {
    Menu.setApplicationMenu(null)
    const win = new BrowserWindow({
        width: 1200,
        height: 840,
        frame: false,
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

    win.webContents.openDevTools();
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        win.loadFile('dist/index.html');
    }
}
app.whenReady().then(() => {
    createWindow()
})
