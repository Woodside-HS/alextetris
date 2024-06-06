let cnv;
let blocks = [];
let oldBlocks = [];
let cellsize = 30;
let gameState = 1;
let pityTime = 2;
let key;
let showinst = false;
let score = 0;
let currentpitytime = 0;
let highscore = 0;
let frame = 5;

function setup() {
    cnv = createCanvas(300, 600);
    cnv.parent('panel');
    key = new Key();
    getNewBlock(floor(random(0, 8)));
}






function draw() {
    background(189, 189, 189);

    frameRate(frame);

    if(score > highscore){
        highscore = score;
    }

    if(score >= 10){
        frame = 10;
        pityTime = pityTime*2
    }

    //Game States
    if (gameState == 2) {

        //run the blocks and check the rows

        for (let i = 0; i < blocks.length; i++) {
            blocks[i].run();
        }
        for (let i = 0; i < oldBlocks.length; i++) {
            oldBlocks[i].render();
        }
        key.checkRows();


    }
    if (gameState == 1) {

        //homescreen
        textAlign(CENTER);
        textSize(40);
        fill(0);
        text("TETRIS GAME", width / 2, height / 3);




        textSize(20);
        fill(0, 0, 0, 100);
        text("Press Play To Start", width / 2, height / 2);


        oldBlocks = [];


        score = 0;


    }


    if (gameState == 3) {

        //died, show score + highscore
        textAlign(CENTER);
        textSize(40);
        fill(0);
        text("you died", width / 2, height / 3);




        textSize(20);
        fill(0, 0, 0, 100);
        text("Score: " + score, width / 2, height / 2);

        text("High Score " + highscore, width / 2, height / 1.75);


        text("Try Again?", width / 2, height / 1.5);


    }

    //toggle for inst
    if (showinst == true && gameState == 1) {
        fill(0, 0, 0, 150);
        rect(width / 2 - 250 / 2, height / 3 - 250 / 3, 250, 300)

        fill(255)
        textSize(15)
        text("AD / Left Right Arrow Keys to Move", width / 2, height / 3 + 25)
        text("S / Down Arrow Key to Soft Drop", width / 2, height / 3 + 50)
        text("W / Up Arrow Key to Rotate", width / 2, height / 3 + 75)
        text("Space to Hard Drop", width / 2, height / 3 + 100)



    }

    document.getElementsByName("gameState").innerHTML = gameState;
    document.getElementsByName("showinst").innerHTML = gameState;
    document.getElementById("score").innerHTML = score;
}







//grab the block version and render it
function getNewBlock(ver) {
    this.ver = ver




    let x = width / 2;
    let y = 0;
    let loc = createVector(x, y);
    blocks.push(new currentBlock(loc, this.ver));


    console.log("NEW BLOCK: " + ver)
}







//get the version and which cells it has to render
function renderOldBlock(cells, ver) {
    this.cells = cells;
    this.blockVer = ver;
    this.render = function () {
        strokeWeight(5);
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
        for (let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            rect(cell.x, cell.y, cellsize, cellsize);
        }
    }
}








function keyPressed() {
    if (keyCode === 65 || keyCode === LEFT_ARROW) {
        if (blocks[0].canMoveLeft()) {
            blocks[0].loc.x -= cellsize;
            currentpitytime = 0;
        }
    }
    if (keyCode === 68 || keyCode === RIGHT_ARROW) {
        if (blocks[0].canMoveRight()) {
            blocks[0].loc.x += cellsize;
            currentpitytime = 0;
        }
    }
    if (keyCode === 87 || keyCode === UP_ARROW) {
        blocks[0].rotate();
    }
    if (keyCode === DOWN_ARROW || keyCode === 83) {
        if (blocks[0].canMoveDown()) {
            blocks[0].loc.y += cellsize;
        }
    }
    if (keyCode === 32) {
        while (blocks[0].canMoveDown()) {
            blocks[0].loc.y += cellsize;
        }
    }
    if (keyCode === 67) {
        blocks[0].saveBlock();
    }
}






