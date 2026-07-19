// ==============================
// CHESS - JavaScript Version
// Parte 1:Setup + Pezzi + Tavola
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
const openings = [
    //French defense: advance
    [["e2e4","white"],["e7e6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c7c5","black"],["c2c3","white"],["b8c6","black"],
     ["g1f3","white"],["c8d7","black"],["f1e2","white"],["g8e7","black"],["O-O","white"],["e7g6","black"]],
    [["e2e4","white"],["e7e6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c7c5","black"],["c2c3","white"],["b8c6","black"],
     ["g1f3","white"],["d8b6","black"],["a2a3","white"],["g8h6","black"],["b2b4","white"],["c5d4","black"]],
    [["e2e4","white"],["e7e6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c7c5","black"],["c2c3","white"],["b8c6","black"],
     ["g1f3","white"],["d8b6","black"],["a2a3","white"],["c5c4","black"],["b1d2","white"],["c6a5","black"],["a1b1","white"],["c8d7","black"],
     ["f1e2","white"],["h7h6","black"]],
    //ITALIANA
    //*Giuoco piano, alternative a 4. ... Cf6
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["f8c5","black"],["c2c3","white"],["d8f6","black"],
     ["d2d4","white"],["e5d4","black"],["e4e5","white"],["f6g6","black"]],
    //**La Bourdonnais variation
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["f8c5","black"],["c2c3","white"],["d7d6","black"],
     ["d2d4","white"],["e5d4","black"],["c3d4","white"],["c5b6","black"],["h2h3","white"],["g8f6","black"],["O-O","white"],["f6e4","black"],
     ["f1e1","white"],["O-O","black"],["e1e4","white"],["d6d5","black"],["c4d5","white"],["d8d5","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["f8c5","black"],["c2c3","white"],["d7d6","black"],
     ["d2d4","white"],["e5d4","black"],["c3d4","white"],["c5b6","black"],["h2h3","white"],["g8f6","black"],["O-O","white"],["O-O","black"],
     ["f1e1","white"],["h7h6","black"],["b1c3","white"],["c6e7","black"]],
    //**Closed
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["f8c5","black"],["c2c3","white"],["d8e7","black"],
     ["b2b4","white"],["c5b6","black"],["O-O","white"],["d7d6","black"]],
    //*Knight attack
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["f6d5","black"],
     ["g5f3","white"],["f8d6","black"],["O-O","white"],["O-O","black"],["f1e1","white"],["f7f5","black"],["f3e5","white"],["d8f6","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["f6d5","black"],
     ["g5f3","white"],["f8d6","black"],["O-O","white"],["d5f4","black"],["b1c3","white"],["f4d3","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["f6d5","black"],
     ["g5f3","white"],["c8g4","black"],["h2h3","white"],["g4h5","black"],["g2g4","white"],["h5g6","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["f6g4","black"],
     ["g5e4","white"],["f7f5","black"],["d3e2","white"],["h7h5","black"],["h2h3","white"],["f5e4","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["h7h6","black"],
     ["g5e4","white"],["f6e4","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["f8e7","black"],
     ["b1c3","white"],["f6d5","black"],["g5f3","white"],["f7f6","black"],["c3d5","white"],["c6d5","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["f8d6","black"],
     ["b1c3","white"],["f6d5","black"],["g5e4","white"],["d6c7","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c7c6","black"],["d5c6","white"],["b7c6","black"],["b5d3","white"],["c8g4","black"],
     ["d3e2","white"],["g4f5","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["c8d7","black"],["d1e2","white"],["f8e7","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6a5","black"],["c4b5","white"],["f6d7","black"],["g5e6","white"],["f7e6","black"],["d5e6","white"],["h7h5","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["c6d4","black"],["c2c3","white"],["f6g4","black"],["d2d3","white"],["a7a5","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["f6e4","black"],
     ["c4f7","white"],["e8e7","black"],["d2d4","white"],["h7h6","black"]],
    //**Traxler
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["f8c5","black"],
     ["c4f7","white"],["e8e7","black"],["f7c4","white"],["h8f8","black"],["O-O","white"],["h7h6","black"],["g5f3","white"],["f6e4","black"]],
    //*Fried liver [e anti-fried liver]
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["f6d5","black"],["g5f7","white"],["e8f7","black"],["d1f3","white"],["f7e6","black"],["b1c3","white"],["c6b4","black"],
     ["O-O","white"],["c7c6","black"],["d2d4","white"],["d8f6","black"],["f3e2","white"],["e6e7","black"],["c3e4","white"],["f6g6","black"],
     ["d4e5","white"],["c8f5","black"],["f2f3","white"],["e7d8","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["g8f6","black"],["f3g5","white"],["d7d5","black"],
     ["e4d5","white"],["f6d5","black"],["g5f7","white"],["e8f7","black"],["d1f3","white"],["f7e6","black"],["b1c3","white"],["c6e7","black"],
     ["d2d4","white"],["c7c6","black"],["d4e5","white"],["b7b5","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["h7h6","black"],["d2d4","white"],["e5d4","black"],
     ["f3d4","white"],["g8f6","black"],["b1c3","white"],["f8b4","black"],["d4c6","white"],["b7c6","black"]],
    //*Rousseau gambit
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["f7f5","black"],["d2d4","white"],["f5e4","black"],
     ["f3e5","white"],["d7d5","black"],["c4b5","white"],["d8d6","black"],["c2c4","white"],["a7a6","black"],["b5c6","white"],["b7c6","black"],
     ["b1c3","white"],["g8f6","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["b8c6","black"],["f1c4","white"],["f7f5","black"],["d2d4","white"],["d8e7","black"],
      ["O-O","white"],["f5e4","black"]],
    //Caro-kann: advance
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],["O-O","white"],["c5d4","black"],["f3d4","white"],["g8e7","black"],
     ["d4f5","white"],["e7f5","black"],["e2d3","white"],["g7g6","black"],["d1e2","white"],["f8g7","black"],["f2f4","white"],["O-O","black"],
     ["b1d2","white"],["f7f6","black"],["e5f6","white"],["d8f6","black"],["d2f3","white"],["a8e8","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],["O-O","white"],["c5d4","black"],["f3d4","white"],["g8e7","black"],
     ["d4f5","white"],["e7f5","black"],["e2d3","white"],["g7g6","black"],["d1e2","white"],["f8g7","black"],["f2f4","white"],["O-O","black"],
     ["b1d2","white"],["f7f6","black"],["e5f6","white"],["f8f6","black"],["d2f3","white"],["d8d7","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],["O-O","white"],["c5d4","black"],["f3d4","white"],["g8e7","black"],
     ["d4f5","white"],["e7f5","black"],["e2d3","white"],["g7g6","black"],["d1e2","white"],["f8g7","black"],["f2f4","white"],["O-O","black"],
     ["b1d2","white"],["d5d4","black"],["d2e4","white"],["h7h5","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],["O-O","white"],["c5d4","black"],["f3d4","white"],["g8e7","black"],
     ["d4f5","white"],["e7f5","black"],["e2d3","white"],["g7g6","black"],["d1e2","white"],["d8c7","black"],["f1e1","white"],["f8g7","black"],
     ["c1f4","white"],["h7h6","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["f8b4","black"],["c2c3","white"],["b4a5","black"],["b1d2","white"],["b8d7","black"],["O-O","white"],["a5c7","black"],
     ["f1e1","white"],["f5g6","black"],["g2g3","white"],["h7h6","black"],["b2b4","white"],["g8e7","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["f8b4","black"],["c2c3","white"],["b4a5","black"],["b1d2","white"],["b8d7","black"],["O-O","white"],["h7h6","black"],
     ["b2b4","white"],["a5b6","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["f8b4","black"],["c2c3","white"],["b4a5","black"],["b1d2","white"],["b8d7","black"],["O-O","white"],["a5c7","black"],
     ["f1e1","white"],["h7h6","black"],["d2f1","white"],["g8e7","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c8f5","black"],["f1e2","white"],["e7e6","black"],
     ["g1f3","white"],["b8d7","black"],["O-O","white"],["a7a5","black"],["b1d2","white"],["a5a4","black"],["c2c4","white"],["h7h6","black"],
     ["c4d5","white"],["c6d5","black"],["d2b1","white"],["g8e7","black"],["b1c3","white"],["a4a3","black"],["b2a3","white"],["e7c6","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],
     ["f1b5","white"],["e7e6","black"],["g1f3","white"],["c8d7","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],
     ["f1b5","white"],["d8b6","black"],["b5a4","white"],["c5d4","black"]],
    [["e2e4","white"],["c7c6","black"],["d2d4","white"],["d7d5","black"],["e4e5","white"],["c6c5","black"],["c2c3","white"],["b8c6","black"],
     ["f1b5","white"],["a7a6","black"],["b5c6","white"],["b7c6","black"]],
    //Difesa siciliana
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["e7e6","black"],["g2g4","white"],["h7h6","black"],["h1g1","white"],["b8c6","black"],["c1e3","white"],["f8e7","black"]],
    //*Sveshnikov
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["e7e5","black"],["d4b5","white"],["d7d6","black"],["c3d5","white"],["f6d5","black"],["e4d5","white"],["c6b8","black"],
     ["a2a4","white"],["f8e7","black"],["f1e2","white"],["O-O","black"],["O-O","white"],["b8d7","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["e7e5","black"],["d4b5","white"],["d7d6","black"],["c3d5","white"],["f6d5","black"],["e4d5","white"],["c6e7","black"],
     ["a2a4","white"],["a7a6","black"]],
    //*Richter-Rauzer
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["d7d6","black"],["c1g5","white"],["e7e6","black"],["d1d2","white"],["a7a6","black"],["O-O-O","white"],["f8e7","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["b8c6","black"],["c1g5","white"],["d8b6","black"],["g5e3","white"],["a7a6","black"]],
    //*accelerated dragon variation
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g7g6","black"],
     ["c2c4","white"],["g8f6","black"],["b1c3","white"],["d7d6","black"],["f1e2","white"],["c6d4","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g7g6","black"],
     ["c2c4","white"],["f8g7","black"],["c1e3","white"],["d8b6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g7g6","black"],
     ["c2c4","white"],["f8g7","black"],["c1e3","white"],["g8f6","black"],["b1c3","white"],["f6g4","black"],["d1g4","white"],["c6d4","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g7g6","black"],
     ["c2c4","white"],["f8g7","black"],["c1e3","white"],["g8f6","black"],["b1c3","white"],["d7d6","black"],["f1e2","white"],["O-O","black"],
     ["O-O","white"],["c6d4","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g7g6","black"],
     ["c2c4","white"],["f8g7","black"],["c1e3","white"],["g8f6","black"],["b1c3","white"],["d7d6","black"],["f1e2","white"],["O-O","black"],
     ["O-O","white"],["a7a6","black"],["h2h3","white"],["c6d4","black"]],
    //*löwenthal [Kalashnikov]
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["e7e5","black"],
     ["d4b5","white"],["d7d6","black"],["c2c4","white"],["a7a6","black"],["b5c3","white"],["g8f6","black"],["f1d3","white"],["f8e7","black"],
     ["O-O","white"],["O-O","black"],["h2h3","white"],["h7h6","black"],["b2b3","white"],["c6b4","black"],["d3e2","white"],["b7b5","black"],
     ["c1e3","white"],["b5c4","black"],["b3c4","white"],["f6d7","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["e7e5","black"],
     ["d4b5","white"],["d7d6","black"],["c2c4","white"],["a7a6","black"],["b5c3","white"],["g8f6","black"],["f1d3","white"],["f8e7","black"],
     ["O-O","white"],["O-O","black"],["h2h3","white"],["h7h6","black"],["b2b3","white"],["b7b5","black"],["c4b5","white"],["a6b5","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["e7e5","black"],
     ["d4b5","white"],["d7d6","black"],["c2c4","white"],["a7a6","black"],["b5c3","white"],["g8f6","black"],["f1d3","white"],["f8e7","black"],
     ["O-O","white"],["O-O","black"],["h2h3","white"],["c8e6","black"],["c3d5","white"],["f6d7","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["e7e5","black"],
     ["d4b5","white"],["d7d6","black"],["c2c4","white"],["a7a6","black"],["b5c3","white"],["f8e7","black"],["c3d5","white"],["g8f6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["e7e5","black"],
     ["d4b5","white"],["d7d6","black"],["c2c4","white"],["g8f6","black"],["b5c3","white"],["f8e7","black"]],
    //*najdorf [6. Ae3]
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["f6g4","black"],["e3c1","white"],["g4f6","black"],["f2f3","white"],["e7e5","black"],
     ["d4b3","white"],["f8e7","black"],["c1e3","white"],["c8e6","black"],["d1d2","white"],["h7h5","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["f6g4","black"],["e3c1","white"],["e7e5","black"],["d4f5","white"],["h7h5","black"],
     ["h2h3","white"],["g4f6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["f6g4","black"],["e3c1","white"],["e7e5","black"],["d4f5","white"],["g4f6","black"],
     ["c1g5","white"],["b8c6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["f6g4","black"],["e3c1","white"],["e7e5","black"],["d4f5","white"],["c8f5","black"],
     ["e4f5","white"],["h7h5","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["f6g4","black"],["e3c1","white"],["b8c6","black"],["h2h3","white"],["g4f6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["e7e5","black"],["d4b3","white"],["c8e6","black"],["f2f3","white"],["f8e7","black"],
     ["d1d2","white"],["h7h5","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["e7e5","black"],["d4b3","white"],["f6g4","black"],["e3d2","white"],["g4f6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["b7b5","black"],["c3d5","white"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["a7a6","black"],["c1e3","white"],["e7e6","black"],["f2f3","white"],["h7h5","black"],["d1d2","white"],["f8e7","black"],
     ["a2a4","white"],["d8c7","black"],["O-O-O","white"],["b8c6","black"]],
    //*Venice Attack
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["e7e5","black"],["f1b5","white"],["b8d7","black"]],
    //*Dragone
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],["f2f3","white"],["O-O","black"],["d1d2","white"],["b8c6","black"],
     ["f1c4","white"],["c6d4","black"],["e3d4","white"],["c8e6","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],["f2f3","white"],["O-O","black"],["d1d2","white"],["b8c6","black"],
     ["f1c4","white"],["c8d7","black"],["O-O-O","white"],["a8c8","black"],["c4b3","white"],["c6d4","black"],["e3d4","white"],["b7b5","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],["f2f3","white"],["O-O","black"],["d1d2","white"],["b8c6","black"],
     ["f1c4","white"],["c8d7","black"],["O-O-O","white"],["a8c8","black"],["c4b3","white"],["c6e5","black"],["c1b1","white"],["f8e8","black"]],
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],["f2f3","white"],["O-O","black"],["d1d2","white"],["b8c6","black"],
     ["f1c4","white"],["c8d7","black"],["O-O-O","white"],["a8c8","black"],["c4b3","white"],["c6e5","black"],["c1b1","white"],["e5c4","black"],
     ["b3c4","white"],["c8c4","black"],["g2g4","white"],["b7b5","black"]],
    //*o'kelly
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["a7a6","black"],["c2c4","white"],["b8c6","black"],["d2d4","white"],["c5d4","black"]],
    //*taimanov
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["e7e6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["b8c6","black"],
     ["b1c3","white"],["g8f6","black"],["d4c6","white"],["b7c6","black"],["e4e5","white"],["f6d5","black"],["c3e4","white"],["c8b7","black"]],
    //*kan
    [["e2e4","white"],["c7c5","black"],["g1f3","white"],["e7e6","black"],["d2d4","white"],["c5d4","black"],["f3d4","white"],["a7a6","black"],
     ["f1d3","white"],["f8c5","black"],["d4b3","white"],["c5a7","black"],["d1e2","white"],["g8e7","black"]],
    //Philidor
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["e5d4","black"],["f3d4","white"],["g8f6","black"],
     ["b1c3","white"],["f8e7","black"],["c1f4","white"],["O-O","black"]],
    [["e2e4","white"],["e7e5","black"],["g1f3","white"],["d7d6","black"],["d2d4","white"],["b8d7","black"],["f1c4","white"],["e5d4","black"]],
    //Pirc defense
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["e7e5","black"],["g1f3","white"],["b8d7","black"],
     ["h1g1","white"],["c7c6","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["e7e5","black"],["g1f3","white"],["e5d4","black"],
     ["f3d4","white"],["f8e7","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["e7e5","black"],["d4e5","white"],["d6e5","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["e7e6","black"],["f2f4","white"],["b8c6","black"],
     ["a2a3","white"],["e6e5","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],
     ["d1d2","white"],["c7c6","black"],["a2a4","white"],["O-O","black"],["f2f3","white"],["b8d7","black"],["g1e2","white"],["e7e5","black"],
     ["h2h4","white"],["e5d4","black"],["e3d4","white"],["h7h5","black"],["e2f4","white"],["d8a5","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],
     ["d1d2","white"],["c7c6","black"],["a2a4","white"],["O-O","black"],["f2f3","white"],["b8d7","black"],["g1e2","white"],["e7e5","black"],
     ["h2h4","white"],["d7b6","black"],["d4e5","white"],["d6e5","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],
     ["d1d2","white"],["O-O","black"],["O-O-O","white"],["f6g4","black"],["e3f4","white"],["c7c5","black"],["d4c5","white"],["b8c6","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],
     ["d1d2","white"],["O-O","black"],["O-O-O","white"],["f6g4","black"],["e3f4","white"],["c7c5","black"],["d4c5","white"],["g7c3","black"],
     ["d2c3","white"],["g4f2","black"],["f4h6","white"],["f7f6","black"],["f1c4","white"],["g8h8","black"],["g1f3","white"],["b8c6","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],
     ["d1d2","white"],["O-O","black"],["O-O-O","white"],["c7c6","black"],["f2f3","white"],["b7b5","black"],["h2h4","white"],["b5b4","black"]],
    [["e2e4","white"],["d7d6","black"],["d2d4","white"],["g8f6","black"],["b1c3","white"],["g7g6","black"],["c1e3","white"],["f8g7","black"],
     ["d1d2","white"],["f6g4","black"],["e3g5","white"],["c7c6","black"]],
    //Scandinava
    [["e2e4","white"],["d7d5","black"],["e4d5","white"],["g8f6","black"],["d2d4","white"],["f6d5","black"],["g1f3","white"],["c8f5","black"],
     ["f1d3","white"],["f5d3","black"]],
    [["e2e4","white"],["d7d5","black"],["e4d5","white"],["g8f6","black"],["d2d4","white"],["f6d5","black"],["g1f3","white"],["c8g4","black"],
     ["c2c4","white"],["d5f6","black"]],
    [["e2e4","white"],["d7d5","black"],["e4d5","white"],["d8d5","black"],["b1c3","white"],["d5d6","black"],["d2d4","white"],["g8f6","black"]],
    [["e2e4","white"],["d7d5","black"],["e4d5","white"],["d8d5","black"],["b1c3","white"],["d5a5","black"],["d2d4","white"],["g8f6","black"],
     ["g1f3","white"],["c7c6","black"]]];

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
// ============================
// Parte 2: Movimento pezzi
// ============================
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
// ==
// ARROCCO
//

// Arrocco corto bianco
if(
    piece.color==="white" &&
    r===7 &&
    c===4 &&
    !this.whiteKingMoved &&
    this.board[7][5]===null &&
    this.board[7][6]===null &&
    this.board[7][7] &&
    this.board[7][7].kind==="rook"
){
    let move = new Move(
        [7,4],
        [7,6],
        this.board
    );
    move.castle = true;
    moves.push(move);
}

// Arrocco lungo bianco
if(
    piece.color==="white" &&
    r===7 &&
    c===4 &&
    !this.whiteKingMoved &&
    this.board[7][1]===null &&
    this.board[7][2]===null &&
    this.board[7][3]===null &&
    this.board[7][0] &&
    this.board[7][0].kind==="rook"
){
    let move = new Move(
        [7,4],
        [7,2],
        this.board
    );
    move.castle = true;
    moves.push(move);
}

// Arrocco corto nero
if(
    piece.color==="black" &&
    r===0 &&
    c===4 &&
    !this.blackKingMoved &&
    this.board[0][5]===null &&
    this.board[0][6]===null &&
    this.board[0][7] &&
    this.board[0][7].kind==="rook"
){
    let move = new Move(
        [0,4],
        [0,6],
        this.board
    );
    move.castle = true;
    moves.push(move);
}
    
// Arrocco lungo nero
if(
    piece.color==="black" &&
    r===0 &&
    c===4 &&
    !this.blackKingMoved &&
    this.board[0][1]===null &&
    this.board[0][2]===null &&
    this.board[0][3]===null &&
    this.board[0][0] &&
    this.board[0][0].kind==="rook"
){
    let move = new Move(
        [0,4],
        [0,2],
        this.board
    );
    move.castle = true;
    moves.push(move);
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
let currentOpening = null;
let openingIndex = 0;

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

        let scaleX = SIZE / rect.width;
        let scaleY = SIZE / rect.height;

        let col = Math.floor((x * scaleX) / SQ);
        let row = Math.floor((y * scaleY) / SQ);

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

        let scaleX = SIZE / rect.width;
        let scaleY = SIZE / rect.height;

        let col = Math.floor((x * scaleX) / SQ);
        let row = Math.floor((y * scaleY) / SQ);
        
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


function coordsToNotation(move){
    let files =
    ["a","b","c","d","e","f","g","h"];

    return (
        files[move.startCol] +
        (8-move.startRow) +
        files[move.endCol] +
        (8-move.endRow)
    );
}

// ================
// IA
// =================
function aiMove(){

    if(game.whiteToMove)
        return;

    // prova a seguire l'apertura
    if(
        currentOpening &&
        openingIndex < currentOpening.length
    ){

        let next =
        currentOpening[openingIndex];
        let moveNotation = next[0];

for(let move of game.getValidMoves()){

    // Arrocco corto
    if(
        moveNotation === "O-O" &&
        move.pieceMoved.kind === "king" &&
        Math.abs(move.endCol - move.startCol) === 2 &&
        move.endCol === 6
    ){
        move.castle = true;
        game.makeMove(move);
        openingIndex++;
        draw();
        return;
    }
    // Arrocco lungo
    if(
        moveNotation === "O-O-O" &&
        move.pieceMoved.kind === "king" &&
        Math.abs(move.endCol - move.startCol) === 2 &&
        move.endCol === 2
    ){
        move.castle = true;
        game.makeMove(move);
        openingIndex++;
        draw();
        return;
    }
    // Mossa normale
    let start = next[0];
    let end = next[1];

    let notation =
    coordsToNotation(move);

    if(notation === start + end){

        game.makeMove(move);
        openingIndex++;
        draw();
        return;
    }
}
    }

    // se non trova la mossa dell'apertura
    // gioca casuale
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
// =========================
// Avvio
// =========================
async function start(){
    await loadImages();
    game =
    new GameState();
    currentOpening =
    openings[
        Math.floor(Math.random()*openings.length)
    ];

    openingIndex = 0;
    draw();
}
start();
