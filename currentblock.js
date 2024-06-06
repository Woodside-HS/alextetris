function currentBlock(loc, ver) {
    this.loc = loc;
    this.blockVer = ver;
    this.rotation = 0;


    this.run = function () {
        let index = blocks.indexOf(this);
        this.render();

        //check if is playing
        if (gameState == 2) {
            if (this.canMoveDown()) {
                this.moveDown();
            } else{

                //if it hits the ground, give the pity time then when its out, splice it out and render it as a old block, get new block
                currentpitytime++;
                if(currentpitytime == pityTime){
                    let cells = this.getCells();
                    oldBlocks.push(new renderOldBlock(cells, ver));
                    blocks.splice(index, 1);
                    getNewBlock(floor(random(0, 8)));
                    currentpitytime = 0;
                }
            }
        }
    }

    //render it by the dictonary
    this.render = function () {
        if (this.blockVer == 0) {
            fill(200, 0, 255);
        } else if (this.blockVer == 1) {
            fill(100, 100, 100);
        } else if (this.blockVer == 2) {
            fill(255, 255, 0);
        } else if (this.blockVer == 3) {
            fill(0, 255, 255);
        } else if (this.blockVer == 4) {
            fill(0, 0, 255);
        } else if (this.blockVer == 5) {
            fill(255, 200, 0);
        } else if (this.blockVer == 6) {
            fill(0, 255, 0);
        } else if (this.blockVer == 7) {
            fill(255, 0, 0);
        }
        strokeWeight(5);


        let cells = this.getCells();
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            rect(cell.x, cell.y, cellsize, cellsize);
        }
    }


    this.moveDown = function () {
        this.loc.y = this.loc.y + cellsize;
    }


    this.canMoveDown = function () {

        //check blocks bellow
        let cells = this.getCells();
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            if (cell.y + cellsize >= height) {
                return false;
            }
            for (let j = 0; j < oldBlocks.length; j++) {
                for (let k = 0; k < oldBlocks[j].cells.length; k++) {
                    let oldCell = oldBlocks[j].cells[k];
                    if (cell.y + cellsize === oldCell.y && cell.x === oldCell.x) {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    this.canMoveLeft = function () {

        //checks blocks on the left so it can move
        let cells = this.getCells();
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            if (cell.x - cellsize < 0) {
                return false;
            }
            for (let j = 0; j < oldBlocks.length; j++) {
                for (let k = 0; k < oldBlocks[j].cells.length; k++) {
                    let oldCell = oldBlocks[j].cells[k];
                    if (cell.y === oldCell.y && cell.x - cellsize === oldCell.x) {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    this.canMoveRight = function () {

        //checks the blocks on its right to move
        let cells = this.getCells();
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            if (cell.x + cellsize >= width) {
                return false;
            }
            for (let j = 0; j < oldBlocks.length; j++) {
                for (let k = 0; k < oldBlocks[j].cells.length; k++) {
                    let oldCell = oldBlocks[j].cells[k];
                    if (cell.y === oldCell.y && cell.x + cellsize === oldCell.x) {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    this.canRotate = function (newRotation) {

        //nested for loop that checks the cells around to rotate
        let cells = this.getCells(newRotation);
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            if (cell.x < 0 || cell.x >= width || cell.y >= height) {
                return false;
            }
            for (let j = 0; j < oldBlocks.length; j++) {
                for (let k = 0; k < oldBlocks[j].cells.length; k++) {
                    let oldCell = oldBlocks[j].cells[k];
                    if (cell.y === oldCell.y && cell.x === oldCell.x) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //dictonary of all block types
    this.getCells = function (rotation = this.rotation) {
        let cells = [];
        if (this.blockVer == 0) { // T PIECE
            if (rotation == 0) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
            } else if (rotation == 1) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
            } else if (rotation == 2) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
            } else if (rotation == 3) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
            }
        } else if (this.blockVer == 1) { // DOT PIECE
            cells.push(createVector(this.loc.x, this.loc.y));
        } else if (this.blockVer == 2) { // 2x2 PIECE
            cells.push(createVector(this.loc.x, this.loc.y));
            cells.push(createVector(this.loc.x - cellsize, this.loc.y));
            cells.push(createVector(this.loc.x, this.loc.y - cellsize));
            cells.push(createVector(this.loc.x - cellsize, this.loc.y - cellsize));
        } else if (this.blockVer == 3) { // LINE PIECE
            if (rotation == 0) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + 2 * cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
            }
            if (rotation == 1) {
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x, this.loc.y + 2 * cellsize));
            }
            if (rotation == 2) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + 2 * cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
            }
            if (rotation == 3) {
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x, this.loc.y + 2 * cellsize));
            }
        } else if (this.blockVer == 4) { // J PIECE
            if (rotation == 0) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y - cellsize));
            } else if (rotation == 1) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y + cellsize));
            } else if (rotation == 2) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y + cellsize));
            } else if (rotation == 3) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y - cellsize));
            }
        } else if (this.blockVer == 5) { // L PIECE
            if (rotation == 0) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y - cellsize));
            } else if (rotation == 1) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y - cellsize));
            } else if (rotation == 2) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y + cellsize));
            } else if (rotation == 3) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y + cellsize));
            }
        } else if (this.blockVer == 6) { // S PIECE
            if (rotation == 0 || rotation == 2) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y - cellsize));
            } else if (rotation == 1 || rotation == 3) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y - cellsize));
            }
        } else if (this.blockVer == 7) { // Z PIECE
            if (rotation == 0 || rotation == 2) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y - cellsize));
                cells.push(createVector(this.loc.x + cellsize, this.loc.y - cellsize));
            } else if (rotation == 1 || rotation == 3) {
                cells.push(createVector(this.loc.x, this.loc.y));
                cells.push(createVector(this.loc.x, this.loc.y + cellsize));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y));
                cells.push(createVector(this.loc.x - cellsize, this.loc.y - cellsize));
            }
        }
        return cells;
    }

    //changes the rotation if it can
    this.rotate = function () {
        let newRotation = (this.rotation + 1) % 4;
        if (this.canRotate(newRotation)) {
            this.rotation = newRotation;
        }
    }




}
