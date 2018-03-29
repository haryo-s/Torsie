/*
Sketch

will be the staging area of the different classes. Aside setting up the canvas 
and several global variables, the sketch will not have any further functionality. 
*/

// GLOBAL VARIABLES
// GLOBAL TORSIE CANVAS SETTINGS
let rows = 63;
let columns = 63;
let quadHeight = 15;
let quadWidth = 15;
let canvasHeight = 180
let canvasWidth = 180;
let canvasColor = 200;

// GLOBAL COLOUR SETTINGS
let QAC;
let color1;
let color2;
let color3;
let color4;
let color5;
let color6;

// This function sets up and returns a new Canvas object for a TorsieArray
function TorsieInstance(CanvasPosX, CanvasPosY, CanvasPattern) {
	
	let CanvasSetup = function(sketch) {
		
		let color1 = 0;
		
		sketch.setup = function() {
			let cnv = sketch.createCanvas(canvasWidth, canvasHeight);
			cnv.position(CanvasPosX, CanvasPosY);
			sketch.background(canvasColor);
			sketch.quads = new QuadArray(rows, columns, quadHeight, quadWidth, sketch);
			sketch.quads.SetupQuadArray();
		}

		sketch.draw = function() {
			sketch.translate(-quadWidth*4, 0);
			sketch.quads.DrawQuadArray();
			CanvasPattern();
		}
	}
	
	return new p5(CanvasSetup);
}

function setup() {
	createCanvas(600, 600);
	background(canvasColor);
	QAC = new QuadArrayController(null, 600);

}

function draw() {
	translate(-quadWidth*4, 0);
	
	color1 = QAC.GetRGB(QAC.Color1.value());
	color2 = QAC.GetRGB(QAC.Color2.value());
	color3 = QAC.GetRGB(QAC.Color3.value());
	color4 = QAC.GetRGB(QAC.Color4.value());
	color5 = QAC.GetRGB(QAC.Color5.value());
	color6 = QAC.GetRGB(QAC.Color6.value());
}

let CanvasInstance1 = TorsieInstance(50, 50, function(){CanvasInstance1.quads.SetPatternAB(color1.r, color1.g, color1.b,
																						   color2.r, color2.g, color2.b)});