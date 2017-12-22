"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const electron_compile_1 = require("electron-compile");
const path = require("path");
// Keep a global reference of the window object.
// If you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const isDevMode = !process.execPath.match(/[\\/]Electrongular/);
if (isDevMode) {
    electron_compile_1.enableLiveReload();
}
const createWindow = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        frame: true,
        show: false,
        webPreferences: { nodeIntegration: false, preload: path.join(__dirname, "preload.ts") },
    });
    // Load the index.html of the app.
    mainWindow.loadURL(`https://gaana.com`);
    // Open the DevTools.
    if (isDevMode) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on("ready-to-show", () => {
        let win = mainWindow;
        win.show();
        console.log(win);
        //win.webContents.executeJavaScript()
    });
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
// This method will be called when Electron has finished initialization, and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', () => {
    let win = mainWindow;
    createWindow();
    let tray = new electron_1.Tray("next");
    tray.on("click", () => {
        win.webContents.executeJavaScript("__next()");
    });
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app, when the dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map