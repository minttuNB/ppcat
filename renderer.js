const path = require('path');
const config = require(path.join(__dirname, "..", "..", "config.json"));
const resolution = {
	x: config.resX,
	y: config.resY
};
const letterbox = {
	x: config.lbResX || 0,
	y: config.lbResY || 0
}
let device = (function(device){
		switch(device){
			case true:
				return `mouse`;
			case false:
				return `pen`;
			default:
				return `pen`;
		}
})(config.modes.osu.mouse);
const images = [
	`${device}_left_top`, `${device}_middle_top`, `${device}_right_top`,
	`${device}_left_middle`, `${device}_middle`, `${device}_right_middle`,
	`${device}_left_bottom`, `${device}_middle_bottom`, `${device}_right_bottom`
];
const ioHook = require('iohook');
const canvas = document.querySelector("canvas");
let currentField = 0;
let ctx = canvas.getContext("2d");
let base = new Image();
base.src = "images/base.png";
base.onload = () => {
	ctx.drawImage(base, 0, 0);
};
let mode = config.mode;
if(config.mode === "osu") mode = config.modes.osu.mouse;
function start(){
	let image = new Image();
	if(config.mode === "osu"){
		image.src = config.modes.osumouse ? "images/devices_mouse.png" : "images/devices.png"
	}
	else if(config.mode === "taiko") image.src = `images/devices_${mode}.png`;
	else throw new Error("Unknown gamemode setting! Currently supported modes: osu, taiko");
	let fix = new Image();
	fix.src = "images/base_partial.png";
	let baseY = 342;
	let i = 669;
	let speed = 20;
	image.onload = (()=>{
			function drawIt(){
				if(i > baseY){
					window.requestAnimationFrame(drawIt);
				}
				else{
					i = 342;
					ctx.clearRect(242, i,684,283);
					ctx.drawImage(fix,0,0);
					ctx.drawImage(image, 242, i);
					return;
				}
				if(i < 370) speed = 4;
				ctx.fillStyle = "#FFFFFF";
				ctx.clearRect(242, i,684,283);
				ctx.drawImage(image, 242, i);
				ctx.drawImage(fix,0,0);
				
				i-=speed;
				
			}
			drawIt();
	});
};
start();
let keysDown = {
	left: false,
	right: false
};
if(config.mode === "osu"){
	let pressLeft = new Image();
	pressLeft.src = "images/button_left_press.png"
	let pressRight = new Image();
	pressRight.src = "images/button_right_press.png"
	let leftup = new Image();
	leftup.src = "images/left_up.png"
	ioHook.on("keydown", event => {
		if(event.rawcode == config.modes.osu.keyLeft){
			ctx.drawImage(pressLeft, 600, 320);
			keysDown.left = true;
		}
		else if(event.rawcode == config.modes.osu.keyRight){
			ctx.drawImage(pressRight, 600, 320);
			keysDown.right = true;
		}
	});
	ioHook.on("keyup", event => {
		if(event.rawcode == config.modes.osu.keyLeft){
			keysDown.left = false;
		}
		if(event.rawcode == config.modes.osu.keyRight){
			keysDown.right = false;
		}
		if(!keysDown.left && !keysDown.right){
			ctx.drawImage(leftup, 600, 320);
		}
	});
}
else if(config.mode === "taiko"){
	let keyLeftBlue = new Image();
	keyLeftBlue.src = "images/taiko_left_blue.png";
	let keyLeftRed = new Image();
	keyLeftRed.src = "images/taiko_left_red.png";
	let keyRightRed = new Image();
	keyRightRed.src = "images/taiko_right_red.png";
	let keyRightBlue = new Image();
	keyRightBlue.src = "images/taiko_right_blue.png";
	let leftuptaiko = new Image();
	leftuptaiko.src = "images/left_up_taiko.png";
	let rightuptaiko = new Image();
	rightuptaiko.src = "images/right_up_taiko.png";
	ioHook.on("keydown", event => {
		if(event.rawcode == config.modes.taiko.keyLeftBlue){
			ctx.drawImage(keyLeftBlue, 543, 329);
		}
		else if(event.rawcode == config.modes.taiko.keyLeftRed){
			ctx.drawImage(keyLeftRed, 543, 329);
		}
		else if(event.rawcode == config.modes.taiko.keyRightRed){
			ctx.drawImage(keyRightRed, 332, 279);
		}
		else if(event.rawcode == config.modes.taiko.keyRightBlue){
			ctx.drawImage(keyRightBlue, 332,279);
		}
	});
	ioHook.on("keyup", event => {
		if(event.rawcode == config.modes.taiko.keyLeftBlue || event.rawcode == config.modes.taiko.keyLeftRed){
			ctx.drawImage(leftuptaiko, 543, 329);
		}
		else if(event.rawcode == config.modes.taiko.keyRightBlue || event.rawcode == config.modes.taiko.keyRightRed){
			ctx.drawImage(rightuptaiko, 332,279);
		}
	});
}
function moveCursor(event){
	if(config.mode === "osu"){
		let x, y;
		if(config.letterboxing){
			let offsetX = ( resolution.x - letterbox.x ) / 2;
			let offsetY = ( resolution.y - letterbox.y ) / 2;
			let posX, posY;
			posX = event.x - offsetX;
			posY = event.y - offsetY;
			if(posX < 0) posX = 0;
			if(posX > letterbox.x || posX == letterbox.x) posX = letterbox.x-1;
			if(posY < 0) posY = 0;
			if(posY > letterbox.y || posY == letterbox.y) posY = letterbox.y-1;
			x = Math.floor(Number(posX)/(Number(letterbox.x)/3));
			y = Math.floor(Number(posY)/(Number(letterbox.y)/3));
		}
		else{
			if(event.x < 0) event.x = 0;
			if(event.x > resolution.x || event.x == resolution.x) event.x = resolution.x-1;
			if(event.y < 0) event.y = 0;
			if(event.y > resolution.y || event.y == resolution.y) event.y = resolution.y-1;
			x = Math.floor(Number(event.x)/(Number(resolution.x)/3));
			y = Math.floor(Number(event.y)/(Number(resolution.y)/3));
		}
		let field = x + y * 3;
	
		if(field !== currentField && field !== undefined){
			currentField = field;
			let pen = new Image();
			pen.src = `images/${images[field]}.png`;
			ctx.drawImage(pen, 256,(261-21));
		}
	}
	else return;
}
ioHook.on("mousemove", event => moveCursor(event));
ioHook.on("mousedrag", event => moveCursor(event));
ioHook.start();