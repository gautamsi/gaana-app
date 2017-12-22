import { app, BrowserWindow, Tray, globalShortcut } from 'electron';
import { enableLiveReload } from 'electron-compile';

const path = require("path");

// Keep a global reference of the window object.
// If you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

const isDevMode: boolean = !process.execPath.match(/[\\/]Electrongular/);

if (isDevMode) {
  enableLiveReload();
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: true,
    show: true,
    webPreferences: { nodeIntegration: false, preload: path.join(__dirname, "preload.ts") },
    height: 90,
    width: 960,
    x:0,
    y:0,
  });

  // Load the index.html of the app.
  // let deviceOptions: Electron.Parameters = <any>{ screenPosition: "mobile", screenSize: { width: 400, height: 700 } }
  // mainWindow.webContents.enableDeviceEmulation(deviceOptions)
  mainWindow.loadURL(`https://gaana.com`);
  // mainWindow.loadURL(`http://www.whatsmyua.info`,{userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'});
  // mainWindow.loadURL(`https://gaana.com`, {userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Mobile Safari/537.36'});

  // android nexus 6 p - Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Mobile Safari/537.36
  // iphone 6 plus - Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1


  // Open the DevTools.
  if (isDevMode) {
    //mainWindow.webContents.openDevTools();
  }

  // mainWindow.on("ready-to-show", () => {
  //   let win = (mainWindow as BrowserWindow);
  //   win.show();
  //   console.log(win);
  //   //win.webContents.executeJavaScript()
  // });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished initialization, and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const trays: Tray[] = [];
app.on('ready', () => {
  createWindow();
  let t_next = new Tray(path.join(__dirname, "assets/next.png"));
  t_next.on("click", () => {
    execScript("__next()");
    console.log("Tray - next called")
  })
  trays.push(t_next);

  let t_pay = new Tray(path.join(__dirname, "assets/play.png"));
  t_pay.on("click", () => {
    execScript("__play()");
    console.log("Tray - play called")
  })
  trays.push(t_pay);

  let t_prev = new Tray(path.join(__dirname, "assets/prev.png"));
  t_prev.on("click", () => {
    execScript("__prev()");
    console.log("Tray - prev called")
  })
  trays.push(t_prev);

  globalShortcut.register("MediaNextTrack",()=>{
    execScript("__next()");
  })
  globalShortcut.register("MediaPreviousTrack",()=>{
    execScript("__prev()");
  })
  globalShortcut.register("MediaPlayPause",()=>{
    execScript("__play()");
  })

});

const execScript = (str: string) => {
  let win = BrowserWindow.getAllWindows();
  if (win.length > 0) {
    win[0].webContents.executeJavaScript(str);
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app, when the dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
