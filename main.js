// Modules to control application life and create native browser window
const fs = require("fs");
const path = require("path");
let config = {
	"resX": 1600,
	"resY": 900,
	"mouse": false,
	"keyLeft": 90, 
	"keyRight": 88
};
let wasThereConfig = true;
try {
	config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "config.json"), "utf8"));
} catch (err) {
	if(err){
		if (err.code === "ENOENT") {
			fs.writeFileSync("config.json", JSON.stringify(config), "utf8");
			wasThereConfig = false;
		}
	}
}
const electron = require('electron');

const { app, BrowserWindow } = electron;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
	if(wasThereConfig === false){
		const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
		config.resX = width;
		config.resY = height + 40;
		fs.writeFileSync(path.join(__dirname, "..", "..", "config.json"), JSON.stringify(config), "utf8");
	}
	mainWindow = new BrowserWindow({ resizable: false, width: 1200, height: 800, title: `ppcat` });
	mainWindow.loadFile('index.html');
	mainWindow.setMenu(null);
	mainWindow.on('closed', function () {
		mainWindow = null
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
