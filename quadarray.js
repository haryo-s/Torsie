/*
QuadArray

The actual 'cloth' of Torsie, it consists of a 2D array of QuadElements.
This class will adjust the colours of the QuadElements in accordance to the patterns.

*/

class QuadArray {
	
	constructor(_rows, _columns, _quadHeight, _quadWidth) {
		this.rows = _rows;
		this.columns = _columns;
		this.quadHeight = _quadHeight;
		this.quadWidth = _quadWidth;
		this.Array = [];
	}
	
	/*//////////////////////////////////
	ARRAY SETUP FUNCTIONS
	//////////////////////////////////*/
	
	// Fill this.Array with new QuadElements 
	SetArray() {
		for (var row = 0; row < this.rows; row++) {
			this.Array[row] = [];
			for (var col = 0; col < this.columns; col++) {
				this.Array[row][col] = new QuadElement(this.quadHeight, this.quadWidth, col, row);	
			}
		}	
	}
	
	// Iterate through this.Array and call DrawQuad function from QuadElement
	DrawArray() {
		for (var row = 0; row < this.Array.length; row++) {
			for (var col = 0; col < this.Array[row].length; col++) {
				
				this.Array[row][col].DrawQuad();
				
			}
		}
	}

	// TODO Create IterateArray() function that will take as arguments a function and iteration rules

	// TODO Create GetDiagonalArray()
	// https://stackoverflow.com/questions/2862802/traverse-2d-array-matrix-diagonally
	// https://stackoverflow.com/questions/1779199/traverse-matrix-in-diagonal-strips
	
	// This function will first create a coordinate array such as the following based on this.rows and this.columns
	// (0,0) (0,1) (0,2) (0,3)
	// (1,0) (1,1) (1,2) (1,3)
	// (2,0) (2,1) (2,2) (2,3)
	//
	// Practically the diagonals are set in this grid
	// (#,#) (#,#) (0,0) (0,1) (0,2) (0,3)
	//       (#,#) (1,0) (1,1) (1,2) (1,3) (#,#)
	//             (2,0) (2,1) (2,2) (2,3) (#,#) (#,#)
	//
	// This is basically a skewed rectangle. When normalised it would look like this:
	// (#,#) (#,#) (0,0) (0,1) (0,2) (0,3)
	// (#,#) (1,0) (1,1) (1,2) (1,3) (#,#)
	// (2,0) (2,1) (2,2) (2,3) (#,#) (#,#)
	//
	// Once created, this function then returns this array which practically has the coordinates for the diagonals which we can call.
	// For example, If we call for alternating diagonals starting from 0, we can iterate through the array and it will return
	// (2,0), 
	// (0,0), (1,1) (2,2)
	// (0,2), (1,3)
	// We would take these coordinates, run on them QuadElement.SetQuadColor and change their colors.

	
	
	/*//////////////////////////////////
	GENERAL ARRAY COLOUR FUNCTIONS
	//////////////////////////////////*/
	
	// Iterate through this.Array and call SetQuadColor function from QuadElement
	SetArrayColor(r, g, b) {
		for (var row = 0; row < this.Array.length; row++) {
			for (var col = 0; col < this.Array[row].length; col++) {
				
				this.Array[row][col].SetQuadColor(r, g, b);
				
			}
		}	
	}
	
	// Set indicated row of Array to color
	SetRowColor(row, r, g, b) {
		for (var col = 0; col < this.Array[row].length; col++) {
			
			this.Array[row][col].SetQuadColor(r, g, b);
			
		}
	}
	
	// Set indicated column of Array to color
	SetColumnColor(colummn, r, g, b) {
		for (var row = 0; row < this.Array.length; row++) {
			
				this.Array[row][colummn].SetQuadColor(r, g, b);
				
		}
	}
	
	/*//////////////////////////////////
	SET ARRAY PATTERN FUNCTIONS
	//////////////////////////////////*/
	
	// Set Array to display PatternAB
	SetPatternAB(rA, gA, bA, rB, gB, bB) {
		this.SetArrayColor(rA, gA, bA);
		
		for (var row = 0; row < this.Array.length; row++) {
			for (var col = 0; col < this.Array[row].length; col++) {
				
				if ((row - col) % 2 == 0) {
					this.Array[row][col].SetQuadColor(rB, gB, bB);
				}
			}
		}
	}
	
	// LEFT BRANCH FUNCTIONS 
	
	// Set Array to display PatternABBC
	SetPatternABBC(rA, gA, bA, rB, gB, bB, rC, gC, bC) {
		this.SetPatternAB(rA, gA, bA, rB, gB, bB);
		
		for (var row = 0; row < this.Array.length; row++) {
			if (row % 2 != 0) {
				for (var col = 0; col < this.Array[row].length; col++) {
					
					if ((row - col) % 2 == 0) {
						this.Array[row][col].SetQuadColor(rC, gC, bC);
					}
				}
			}
		}
	}
	
	// Set Array to display PatternADBC
	SetPatternADBC(rA, gA, bA, rB, gB, bB, rC, gC, bC, rD, gD, bD) {
		this.SetPatternABBC(rA, gA, bA, rB, gB, bB, rC, gC, bC);
		
		for (var row = 0; row < this.Array.length; row++) {
			if (row % 2 == 0) {
				for (var col = 0; col < this.Array[row].length; col++) { 
				
					if ((row - col) % 2 != 0) {
						this.Array[row][col].SetQuadColor(rD, gD, bD);
					}
				}				
			}
		}
	}
	
	// RIGHT BRANCH FUNCTIONS
	
	// Set Array to display PatternADBC
	// Currently has an issue where the centerline is a symmetry point.
	// The right branch might need a different method to iterate through the array
	// This different method is documented at this.GetDiagonalArray()

	SetPatternCAB(rA, gA, bA, rB, gB, bB, rC, gC, bC) {
		// this.SetArrayColor(rA, gA, bA);
		
		for (var row = 0; row < this.Array.length; row++) {
			for (var col = 0; col < this.Array[row].length; col++) {
				
				if (Math.abs(row - col) % 3 == 0) {
					this.Array[row][col].SetQuadColor(rB, gB, bB);
				}
				else if (Math.abs(row - col) % 3 == 1) {
					this.Array[row][col].SetQuadColor(rC, gC, bC);
				}
				else if (Math.abs(row - col) % 3 == 2) {
					this.Array[row][col].SetQuadColor(rA, gA, bA);
				}
				
			}			
		}
	}
	
	// TODO: Create function SetPatternCABDAB(rA, gA, bA, rB, gB, bB, rC, gC, bC, rD, gD, bD)
	
	// TODO: Create function SetPatternCABDEB(rA, gA, bA, rB, gB, bB, rC, gC, bC, rD, gD, bD, rE, gE, bE)
	
	// TODO: Create function SetPatternCABDEF(rA, gA, bA, rB, gB, bB, rC, gC, bC, rD, gD, bD, rE, gE, bE, rF, gF, bF)
	
	// Set Array to display Alternating Rows
	SetPatternAlternatingRows(rA, gA, bA, rB, gB, bB) {
		this.SetArrayColor(rA, gA, bA);
		
		for (var row = 0; row < this.Array.length; row++) {
			
			if (row % 2 == 0) { 
				this.SetRowColor(row, rB, gB, bB);
			}
		}
	}
	
	// Set Array to display Alternating Columns
	SetPatternAlternatingColumns(rA, gA, bA, rB, gB, bB) {
		this.SetArrayColor(rA, gA, bA);
		
		for (var row = 0; row < this.Array.length; row++) {
			for (var col = 0; col < this.Array[row].length; col++) {
				
				if (col % 2 == 0) {
					this.SetColumnColor(col, rB, gB, bB);
				}
			}
		}
	}
}
