var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

//Paleta

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//Detectar las teclas direcciones de izquiera/dercha
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var vidas = 3;

var bloques  = [];

for (var  fila = 0; fila  <  brickRowCount; fila++) {
  bloques[fila] = [];
  for (var columna = 0; columna < brickColumnCount; columna++) {
    bloques[fila][columna] = { x: 0, y: 0 , status :1};

  }
}

// Agregar eventos de presionado y soltado de teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Esta funcion determina si se presiona una tecla
function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
}

//Esta funcion determina si se suelta una tecla
function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else  if (event.keyCode == 37) {
    leftPressed = false;
  }
}

//Esta funcion dibuja una paleta
function drawPaddle() {
context.beginPath();
context.rect(paddleX,canvas.height-paddleHeight, paddleWidth, paddleHeight);
context.fillStyle = "#0095DD";
context.fill();
context.closePath();

}

// Esta funsion dibuja una fila de bloque
function drawBricks() {
  for (var row = 0; row  <  brickRowCount; row++) {
    for (var column = 0; column < brickColumnCount; column++) {
      var bloque = bloques[row][column];

      if (bloque.status == 1){
        var brickX = (column *(brickWidth + brickPadding))+ brickOffsetLeft;
        var brickY = (row *(brickHeight + brickPadding))+ brickOffsetTop;

        bloque.x = brickX;
        bloque.y = brickY;

        // Dibuja bloque
       drawBrick(brickX, brickY);
      }
    }
  }
}

function drawBrick(brickX, brickY) {
  context.beginPath();
  context.rect(brickX, brickY, brickWidth, brickHeight);
  context.fillStyle = "#54a0ff";
  context.fill();
  context.closePath();
}

// Esta funcion dibuja un circulo en la posicion x, y
function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function detectarChoque () {
  for (var row = 0; row  <  brickRowCount; row++) {
    for (var column = 0; column < brickColumnCount; column++) {
      var bloque = bloques[row][column];



     if (bloque.status == 1){
      if (
        x > bloque.x &&
        x < bloque.x + brickWidth &&
        y > bloque.y &&
        y < bloque.y + brickHeight) {
          dy = -dy;
          bloque.status = 0;
          score++;


     if (score == brickColumnCount * brickRowCount) {
       alert("GANASTE");
       document.location.reload();
     }

          }
        }
      }
    }
  }

  // Esta funcion dibuja el puntaje
  function dibujarPuntaje() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Puntaje : " + score, 8, 20);
  }

//Esta funcion ve las vidas
  function verVidas() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Vidas : " + vidas, 400, 20);
  }

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

 // Se llama a la funcion dibujar bloques
  drawBricks();

  // Se llama a la funcion de dibujar un circulo
  drawBall();

  //Se llama la funcion de dibujar un rectangulo
  drawPaddle();

  //Se manda a la funcion detectar choque
  detectarChoque();

//se llama a la funcion dibujar puntaje
  dibujarPuntaje();

//Se llama a la funcion ver vidas
  verVidas();

  // Verificar si llego al limite izquierdo/derecho
  if (x + dx > canvas.width - ballRadius  || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    } else {
      vidas--;
      if (!vidas) {
        alert("PERDISTE");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
      // si no son iguales a cero, reiniciar la posicion de la paleta al medio y poner la pelotita abajo
    }
  }

  // verificar si se toco la tecla direccional derecha
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
