const path = require('path');
const config = require(path.join(__dirname, "..", "..", "config.json"));
console.log(__dirname);
const resolution = {
	x: config.resX,
	y: config.resY
};
let device = (function(device){
		switch(device){
			case true:
				return `mouse`;
			case false:
				return `pen`;
			default:
				return `pen`;
		}
})(config.mouse);
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
let pressLeft = new Image();
pressLeft.src = "images/button_left_press.png"
let pressRight = new Image();
pressRight.src = "images/button_right_press.png"
let leftup = new Image();
leftup.src = "images/left_up.png"
base.onload = () => {
	ctx.drawImage(base, 0, 0);
};
let waves = 0;
let waveSide = 0;
function wave(){
	if(waves < 11){
		let left = new Image();
		left.src = "images/wave_left.png";
		let right = new Image();
		right.src = "images/wave_right.png";
		window.requestAnimationFrame(wave);
		if (waveSide == 0) {
			for(let j=0; j<12000; j++){
				ctx.drawImage(left,0,0);
			}
			waveSide = 1;
		}
		else{
			for(let j=0; j<12000; j++){
				ctx.drawImage(right,0,0);
			}
			waveSide = 0;
		}
		waves++;
	}
	else{
		ctx.drawImage(base, 0, 0);
		start();
	}
}
function start(){
	let image = new Image();
	image.src = config.mouse ? "images/devices_mouse.png" : "images/devices.png"
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
wave();
ioHook.on("keydown", event => {
	if(event.rawcode == config.keyLeft)
		ctx.drawImage(pressLeft, 600, 320);
	else if(event.rawcode == config.keyRight)
		ctx.drawImage(pressRight, 600, 320);
});
ioHook.on("keyup", event => {
	ctx.drawImage(leftup, 600, 320);
});
ioHook.on("mousemove", event => {
	if(event.x < 0) event.x = 0;
	if(event.x > resolution.x || event.x == resolution.x) event.x = resolution.x-1;
	if(event.y < 0) event.y = 0;
	if(event.y > resolution.y || event.y == resolution.y) event.y = resolution.y-1;
	let x = Math.abs(Math.floor(Number(event.x)/(Number(resolution.x)/3)));
	let y = Math.abs(Math.floor(Number(event.y)/(Number(resolution.y)/3)));
	let field = x + y * 3;

	if(field !== currentField && field !== undefined){
		currentField = field;
		let pen = new Image();
		pen.src = `images/${images[field]}.png`;
		ctx.drawImage(pen, 256,(261-21));
	}
});
ioHook.start();

//600,320 left hand
//256,261 / 256,240 right hand, size 242x239