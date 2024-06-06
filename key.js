function Key() {
    this.checkRows = function () {
        let rows = {};
        for (let i = 0; i < oldBlocks.length; i++) {
            let cells = oldBlocks[i].cells;
            for (let j = 0; j < cells.length; j++) {
                let cell = cells[j];
                let row = cell.y;
               
                // Check if any block is at the top of the screen
                if (cell.y <= 0) {
                    gameState = 3;
                    return; // Exit the function early
                }


                if (!rows[row]) {
                    rows[row] = [];
                }
                rows[row].push(cell);
            }
        }
       
        // Just keeps checking if any of the rows are complete or if the number of blocks is equal to the width of the canvas or more
        for (let row in rows) {
            if (rows[row].length >= width / cellsize) {
                // If so then go here and remove the said row
                this.clearRow(row);
            }
        }
    }


    // Also I just figured out what objects are in this type of instance so bear with me
    this.clearRow = function (row) {
        // Grab all the blocks from the clear row and get them out, once its gone get rid of the old blocks (the rendered ones out too)
        for (let i = oldBlocks.length - 1; i >= 0; i--) {
            let cells = oldBlocks[i].cells;
            for (let j = cells.length - 1; j >= 0; j--) {
                if (cells[j].y == row) {
                    cells.splice(j, 1);
                }
            }
            if (cells.length == 0) {
                oldBlocks.splice(i, 1);
            }
        }


        // Move the things down
        for (let i = 0; i < oldBlocks.length; i++) {
            let cells = oldBlocks[i].cells;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].y < row) {
                    cells[j].y += cellsize;
                }
            }
        }


        score++;
    }
}


