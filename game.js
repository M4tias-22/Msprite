// ==============================
// CHESS VS - JavaScript Version
// Parte 1: Setup + Pezzi + Tavola
// ==============================

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const SIZE = 720;
const SQ = SIZE / 8;

canvas.width = SIZE;
canvas.height = SIZE;


// Colori tavola
const WHITE = "#f5f5f5";
const PURPLE = "#874dbf";
const HIGHLIGHT = "rgba(0,255,0,0.35)";


// Aperture (da riempire in futuro)
const openings = [];


// Immagini
const IMAGES = {};

const pieces = [
    "pawn",
    "rook",
    "knight",
    "bishop",
    "queen",
    "king"
];

const colors = [
    "white",
    "black"
];


function loadImages(){

    let loaded = 0;
    const total = pieces.length * colors.length;

    return new Promise(resolve => {

        for(let color of colors){

            for(let piece of pieces){

                let img = new Image();

                img.src =
                `immagini/${color}_${piece}.png`;

                img.onload = ()=>{

                    loaded++;

                    if(loaded === total){
                        resolve();
                    }

                };

                IMAGES[`${color}_${piece}`] = img;
            }
        }

    });

}


// ==============================
// Classe Pezzo
// ==============================

class Piece {

    constructor(color, kind){

        this.color = color;
        this.kind = kind;

    }

}


// ==============================
// Classe Mossa
// ==============================

class Move {

    constructor(start,end,board){

        this.startRow = start[0];
        this.startCol = start[1];

        this.endRow = end[0];
        this.endCol = end[1];


        this.pieceMoved =
        board[this.startRow][this.startCol];


        this.pieceCaptured =
        board[this.endRow][this.endCol];


        this.castle = false;
        this.enPassant = false;
        this.promotion = false;

    }


    notation(){

        return (
            this.startCol +
            this.startRow +
            "-" +
            this.endCol +
            this.endRow
        );

    }

}



// ==============================
// Stato del gioco
// ==============================

class GameState {


constructor(){

    this.reset();

}



reset(){

    this.board =
    Array.from(
        {length:8},
        ()=>Array(8).fill(null)
    );


    // pedoni

    for(let i=0;i<8;i++){

        this.board[1][i] =
        new Piece("black","pawn");

        this.board[6][i] =
        new Piece("white","pawn");

    }



    // torri

    this.board[0][0] =
    new Piece("black","rook");

    this.board[0][7] =
    new Piece("black","rook");

    this.board[7][0] =
    new Piece("white","rook");

    this.board[7][7] =
    new Piece("white","rook");



    // cavalli

    this.board[0][1] =
    new Piece("black","knight");

    this.board[0][6] =
    new Piece("black","knight");

    this.board[7][1] =
    new Piece("white","knight");

    this.board[7][6] =
    new Piece("white","knight");



    // alfieri

    this.board[0][2] =
    new Piece("black","bishop");

    this.board[0][5] =
    new Piece("black","bishop");

    this.board[7][2] =
    new Piece("white","bishop");

    this.board[7][5] =
    new Piece("white","bishop");



    // regine

    this.board[0][3] =
    new Piece("black","queen");

    this.board[7][3] =
    new Piece("white","queen");



    // re

    this.board[0][4] =
    new Piece("black","king");

    this.board[7][4] =
    new Piece("white","king");



    this.whiteToMove = true;

    this.moveLog=[];


    this.enPassantSquare=null;


    this.whiteKingMoved=false;
    this.blackKingMoved=false;


}


}
// ==============================
// Parte 2: Movimento pezzi
// ==============================


GameState.prototype.makeMove = function(move){

    this.board[move.startRow][move.startCol] = null;

    this.board[move.endRow][move.endCol] =
        move.pieceMoved;


    // promozione automatica a regina
    if(move.promotion){

        this.board[move.endRow][move.endCol] =
            new Piece(
                move.pieceMoved.color,
                "queen"
            );

    }


    // arrocco
    if(move.castle){

        if(move.endCol === 6){

            let rook =
            this.board[move.endRow][7];

            this.board[move.endRow][5] = rook;
            this.board[move.endRow][7] = null;

        }


        if(move.endCol === 2){

            let rook =
            this.board[move.endRow][0];

            this.board[move.endRow][3] = rook;
            this.board[move.endRow][0] = null;

        }

    }



    this.moveLog.push(move);


    this.whiteToMove =
    !this.whiteToMove;

};





GameState.prototype.undoMove = function(){

    if(this.moveLog.length===0)
        return;


    let move =
    this.moveLog.pop();


    this.board[move.startRow][move.startCol] =
    move.pieceMoved;


    this.board[move.endRow][move.endCol] =
    move.pieceCaptured;


    this.whiteToMove =
    !this.whiteToMove;

};





GameState.prototype.getValidMoves = function(){

    return this.getAllMoves();

};





GameState.prototype.getAllMoves = function(){

    let moves=[];


    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){

            let piece =
            this.board[r][c];


            if(piece){

                if(
                (piece.color==="white")
                ===
                this.whiteToMove
                ){

                    moves.push(
                    ...this.getPieceMoves(
                        r,
                        c,
                        piece
                    ));

                }

            }

        }

    }


    return moves;

};






GameState.prototype.getPieceMoves =
function(r,c,piece){


let moves=[];



// ----------------
// PEDONE
// ----------------

if(piece.kind==="pawn"){


    let dir =
    piece.color==="white"
    ? -1
    : 1;


    let start =
    piece.color==="white"
    ? 6
    : 1;



    // avanti

    if(
    this.inBoard(r+dir,c)
    &&
    !this.board[r+dir][c]
    ){

        let move =
        new Move(
            [r,c],
            [r+dir,c],
            this.board
        );


        if(r+dir===0 || r+dir===7)
            move.promotion=true;


        moves.push(move);



        // doppio passo

        if(
        r===start &&
        !this.board[r+2*dir][c]
        ){

            moves.push(
                new Move(
                    [r,c],
                    [r+2*dir,c],
                    this.board
                )
            );

        }


    }



    // catture

    for(let dc of [-1,1]){

        let nr=r+dir;
        let nc=c+dc;


        if(this.inBoard(nr,nc)){

            let target =
            this.board[nr][nc];


            if(
            target &&
            target.color!==piece.color
            ){

                let move =
                new Move(
                    [r,c],
                    [nr,nc],
                    this.board
                );


                if(nr===0 || nr===7)
                    move.promotion=true;


                moves.push(move);

            }

        }

    }

}




// ----------------
// CAVALLO
// ----------------

if(piece.kind==="knight"){


let jumps=[
[-2,-1],
[-2,1],
[-1,-2],
[-1,2],
[1,-2],
[1,2],
[2,-1],
[2,1]
];


for(let j of jumps){

    let nr=r+j[0];
    let nc=c+j[1];


    if(this.inBoard(nr,nc)){

        let target =
        this.board[nr][nc];


        if(
        !target ||
        target.color!==piece.color
        ){

            moves.push(
                new Move(
                    [r,c],
                    [nr,nc],
                    this.board
                )
            );

        }

    }

}


}





// ----------------
// TORRE
// ALFIERE
// REGINA
// ----------------


let directions=[];


if(piece.kind==="rook"){

directions=[
[-1,0],
[1,0],
[0,-1],
[0,1]
];

}


if(piece.kind==="bishop"){

directions=[
[-1,-1],
[-1,1],
[1,-1],
[1,1]
];

}


if(piece.kind==="queen"){

directions=[
[-1,0],
[1,0],
[0,-1],
[0,1],
[-1,-1],
[-1,1],
[1,-1],
[1,1]
];

}




for(let d of directions){

    for(let i=1;i<8;i++){

        let nr=r+d[0]*i;
        let nc=c+d[1]*i;


        if(!this.inBoard(nr,nc))
            break;


        let target =
        this.board[nr][nc];


        if(!target){

            moves.push(
                new Move(
                    [r,c],
                    [nr,nc],
                    this.board
                )
            );

        }
        else{

            if(target.color!==piece.color){

                moves.push(
                    new Move(
                        [r,c],
                        [nr,nc],
                        this.board
                    )
                );

            }

            break;

        }

    }

}





// ----------------
// RE
// ----------------


if(piece.kind==="king"){


let dirs=[
[-1,0],
[1,0],
[0,-1],
[0,1],
[-1,-1],
[-1,1],
[1,-1],
[1,1]
];


for(let d of dirs){

    let nr=r+d[0];
    let nc=c+d[1];


    if(this.inBoard(nr,nc)){

        let target =
        this.board[nr][nc];


        if(
        !target ||
        target.color!==piece.color
        ){

            moves.push(
                new Move(
                    [r,c],
                    [nr,nc],
                    this.board
                )
            );

        }

    }

}


}



return moves;

};





GameState.prototype.inBoard=function(r,c){

return (
r>=0 &&
r<8 &&
c>=0 &&
c<8
);

};
// ==============================
// Parte 3: Grafica + Controlli + IA
// ==============================


let game;
let selected = null;
let playerColor = "white";




// Disegna scacchiera

function drawBoard(){


    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){


            if((r+c)%2===0)
                ctx.fillStyle=WHITE;
            else
                ctx.fillStyle=PURPLE;


            ctx.fillRect(
                c*SQ,
                r*SQ,
                SQ,
                SQ
            );


        }

    }


}





// Disegna pezzi

function drawPieces(){


    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){


            let piece =
            game.board[r][c];


            if(piece){


                let img =
                IMAGES[
                `${piece.color}_${piece.kind}`
                ];


                if(img.complete){

                    ctx.drawImage(
                        img,
                        c*SQ,
                        r*SQ,
                        SQ,
                        SQ
                    );

                }

            }


        }

    }


}







function highlight(){


    if(selected){


        ctx.fillStyle =
        HIGHLIGHT;


        ctx.fillRect(
            selected.c*SQ,
            selected.r*SQ,
            SQ,
            SQ
        );


    }

}





function draw(){


    drawBoard();

    highlight();

    drawPieces();


    document.getElementById("turn").innerHTML =
    game.whiteToMove
    ?
    "Turno: Bianco"
    :
    "Turno: Nero";


}







// ==============================
// Click / Touch
// ==============================


canvas.addEventListener(
"click",
function(e){


    if(
    (game.whiteToMove && playerColor==="white")
    ||
    (!game.whiteToMove && playerColor==="black")
    ){



        let rect =
        canvas.getBoundingClientRect();



        let x =
        e.clientX - rect.left;


        let y =
        e.clientY - rect.top;



        let col =
        Math.floor(x / SQ);


        let row =
        Math.floor(y / SQ);




        handleClick(row,col);


    }


});





// compatibilità telefono

canvas.addEventListener(
"touchstart",
function(e){

    e.preventDefault();


    if(
    (game.whiteToMove && playerColor==="white")
    ||
    (!game.whiteToMove && playerColor==="black")
    ){


        let touch =
        e.touches[0];


        let rect =
        canvas.getBoundingClientRect();



        let x =
        touch.clientX - rect.left;


        let y =
        touch.clientY - rect.top;



        let col =
        Math.floor(x/SQ);


        let row =
        Math.floor(y/SQ);



        handleClick(row,col);


    }


},
{passive:false}
);








function handleClick(row,col){


    if(selected===null){


        let piece =
        game.board[row][col];


        if(
        piece &&
        (
        piece.color==="white"
        )===game.whiteToMove
        ){

            selected={
                r:row,
                c:col
            };

        }


    }

    else{


        let moves =
        game.getValidMoves();



        for(let move of moves){


            if(
            move.startRow===selected.r &&
            move.startCol===selected.c &&
            move.endRow===row &&
            move.endCol===col
            ){


                game.makeMove(move);


                selected=null;


                draw();


                setTimeout(aiMove,300);


                return;

            }


        }


        selected=null;

    }


    draw();

}







// ==============================
// IA casuale
// ==============================


function aiMove(){


    // muove solo quando non è il turno umano

    if(game.whiteToMove)
        return;



    let moves =
    game.getValidMoves();



    if(moves.length===0)
        return;



    let move =
    moves[
        Math.floor(
        Math.random()*moves.length
        )
    ];



    game.makeMove(move);


    draw();


}









// ==============================
// Reset
// ==============================


document
.getElementById("reset")
.addEventListener(
"click",
function(){

    game.reset();

    selected=null;

    draw();

});








// ==============================
// Avvio
// ==============================


async function start(){


    await loadImages();


    game =
    new GameState();


    draw();


}


start();
