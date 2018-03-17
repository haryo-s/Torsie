var quads;
var rows = 24;
var columns = 36;
var quadHeight = 25;
var quadWidth = 25;

function setup() {
	
	background(128);
	createCanvas(750, 750);
	
	//translate(-(quadWidth*2), 0);
	
	quads = new QuadArray(rows, columns, quadHeight, quadWidth);
	quads.SetArray();
	
}

function draw() {
	quads.DrawArray();
	
	// quads.SetSingleColor(128, 64, 64);
	// quads.SetSingleColor(128, 64, 128);
	quads.SetABPattern(0, 0, 0, 128, 0, 0);
	// quads.SetAlternateRowPattern(20, 20, 20, 120, 120, 120);
}
