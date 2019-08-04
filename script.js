var BOX_SIZE = 3;
var CANVAS;
var CTX;
var CANVAS_SCALE;

function onLoad() {
  CANVAS = document.getElementById('canvas');
  CTX = CANVAS.getContext('2d');
  CANVAS_SCALE = CANVAS.height;

  var board = new Board();
  drawBoard(board);

}

function Board() {
  this.size = BOX_SIZE * BOX_SIZE;
  this.cells = Array(this.size);
  for (var x = 0; x < this.size; x++) {
    this.cells[x] = Array(this.size);
    for (var y = 0; y < this.size; y++) {
      this.cells[x][y] = Array(this.size);
      for (var v = 0; v < this.size; v++) {
        this.cells[x][y][v] = v;
      }
    }
  }

  this.at = function(x, y) {
    return this.cells[x][y];
  }
}

function drawBoard(board) {
  drawGrid();
  drawCells(board);
}

function drawGrid() {
  CTX.beginPath();
  CTX.lineWidth = 2;
  for (var i = 1; i < BOX_SIZE; i++) {
    var v = i * CANVAS_SCALE / BOX_SIZE;

    // vertical box seperators
    CTX.moveTo(v, 0);
    CTX.lineTo(v, CANVAS_SCALE * BOX_SIZE);

    // horizontal box seperators
    CTX.moveTo(0, v);
    CTX.lineTo(CANVAS_SCALE * BOX_SIZE, v);
  }
  CTX.stroke();
  CTX.lineWidth = 1;
  for (var i = 0; i < BOX_SIZE; i++) {
    for (var j = 1; j < BOX_SIZE; j++) {
      var v = i * CANVAS_SCALE / BOX_SIZE + j * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE);

      // vertical cell seperators
      CTX.moveTo(v, 0);
      CTX.lineTo(v, CANVAS_SCALE * BOX_SIZE);

      // horizontal cell seperators
      CTX.moveTo(0, v);
      CTX.lineTo(CANVAS_SCALE * BOX_SIZE, v);
    }
  }
  CTX.stroke();
}

function drawCells(board) {
  CTX.beginPath();
  CTX.textAlign = 'center';
  CTX.textBaseline = 'middle';
  for (var x = 0; x < board.size; x++) {
    for (var y = 0; y < board.size; y++) {
      var v_x = x * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE);
      var v_y = y * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE);

      cell = board.at(x, y);
      if (cell.length == 1) {
        v_x += 0.5 * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE);
        v_y += 0.6 * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE);

        CTX.font = "50px sans-serif";
        CTX.fillText(1 + cell[0], v_x, v_y);
      } else {
        for (var a = 0; a < BOX_SIZE; a++) {
          for (var b = 0; b < BOX_SIZE; b++) {
            var v_xm = v_x + (a + 0.5) * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE * BOX_SIZE);
            var v_ym = v_y + (b + 0.6) * CANVAS_SCALE / (BOX_SIZE * BOX_SIZE * BOX_SIZE);

            CTX.font = "15px sans-serif";
            CTX.fillText(1 + a + b * BOX_SIZE, v_xm, v_ym);
          }
        }
      }
    }
  }
  CTX.stroke();
}
