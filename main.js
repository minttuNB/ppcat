const fs = require("fs");
const path = require("path");
let config = {
	"resX": 1600,
	"resY": 900,
	"letterboxing": false,
	"lbResX": 1280,
	"lbResY": 960,
	"mode": "osu",
	"modes":{
		"osu":{
			"keyLeft": 90,
			"keyRight": 88,
			"mouse": false
		},
		"taiko":{
			"keyLeftBlue": 90,
      		"keyLeftRed": 88,
      		"keyRightRed": 67,
      		"keyRightBlue": 86
		},
		"keyboard":{
			"mouse": true
		}
	}
}
let wasThereConfig = true;
try {
	config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "config.json"), "utf8"));
} catch (err) {
	if(err){
		if (err.code === "ENOENT") {
			fs.writeFileSync("config.json", JSON.stringify(config, 0, 4), "utf8");
			wasThereConfig = false;
		}
	}
}
const electron = require('electron');

const { app, BrowserWindow } = electron;
app.disableHardwareAcceleration();

let mainWindow;

function createWindow() {
	if(wasThereConfig === false){
		const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
		config.resX = width;
		config.resY = height + 40;
		fs.writeFileSync(path.join(__dirname, "..", "..", "config.json"), JSON.stringify(config, 0, 4), "utf8");
	}
	mainWindow = new BrowserWindow({ resizable: false, width: 1200, height: 800, title: `ppcat` });
	mainWindow.loadFile('index.html');
	mainWindow.setMenu(null);
	mainWindow.on('closed', function() {
		mainWindow = null
	});
}
let isSecondInstance = app.makeSingleInstance(function(commandLine, workingDirectory){
	if(mainWindow){
		if(mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
})
if(isSecondInstance){
	app.quit();
	return;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
