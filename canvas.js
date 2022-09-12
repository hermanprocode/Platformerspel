let sound = true;
function soundIcon() {
  //Om man har ljud eller inte
  document.body.classList.toggle("sound-mode");
}
function gamemenu() {
  //huvudmenyn
  document.getElementById("audio_on").onclick = function () {
    document.getElementById("audio_on").style.display = "none";
    document.getElementById("audio_off").style.display = "block";
    sound = false;
  };
  document.getElementById("audio_off").onclick = function () {
    document.getElementById("audio_off").style.display = "none";
    document.getElementById("audio_on").style.display = "block";
    sound = true;
  };
  document.getElementById("start_screen").onclick = function () {
    document.getElementById("start_screen").style.display = "none";
    document.getElementById("audio_off").style.display = "none";
    document.getElementById("audio_on").style.display = "none";
    startgame();
  };
}
function startgame() {
  window.focus;
  let myCanvas = document.getElementById("myCanvas");

  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  let dx = 0; //sätter start hastigheten i x-led
  let dy = 0; //sätter start hastigheten i y-led
  let x = 400; //sätter var karaktären startar i x-led
  let y = 200; //sätter var karaktären startar i y-led
  let c = myCanvas.getContext("2d");

  //bestämmer hur karaktären ser ut
  class solid {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  }
  //listor med block för olika levlar
  let solids1 = [];
  let solids2 = [];
  let solids3 = [];

  //skapar blocken för varje level
  solids1.push(new solid(100, 555, 1050, 5, "black"));
  solids1.push(new solid(700, 400, 200, 25, "lime"));
  solids1.push(new solid(800, 100, 200, 25, "black"));
  solids1.push(new solid(500, 200, 100, 25, "black"));
  solids1.push(new solid(1100, 0, 50, 555, "black"));
  solids1.push(new solid(300, 140, 50, 25, "black"));
  solids1.push(new solid(100, 0, 50, 555, "black"));
  solids1.push(new solid(200, 450, 200, 25, "rgb(172, 230, 241)"));
  solids1.push(new solid(570, 0, 50, 50, "black"));

  solids2.push(new solid(495, 500, 200, 25, "black"));
  solids2.push(new solid(750, 400, 30, 25, "rgb(172, 230, 241)"));
  solids2.push(new solid(850, 300, 30, 25, "lime"));
  solids2.push(new solid(950, 200, 30, 25, "rgb(172, 230, 241)"));
  solids2.push(new solid(1050, 100, 30, 25, "lime"));
  solids2.push(new solid(500, 375, 100, 25, "lime"));
  solids2.push(new solid(200, 300, 150, 25, "rgb(172, 230, 241)"));
  solids2.push(new solid(1100, 0, 50, 600, "black"));
  solids2.push(new solid(570, 0, 50, 600, "black"));
  solids2.push(new solid(100, 0, 50, 600, "black"));
  solids2.push(new solid(700, 100, 150, 25, "black"));

  solids3.push(new solid(550, 375, 100, 25, "lime"));
  solids3.push(new solid(1100, 0, 50, 600, "black"));
  solids3.push(new solid(100, 0, 50, 600, "black"));
  solids3.push(new solid(495, 500, 200, 25, "black"));
  solids3.push(new solid(570, 525, 50, 60, "black"));

  let solids = [solids1, solids2, solids3]; // alla levelars block i en lista

  let ard = false; // Om arrow right är nere
  let ald = false; // Om arrow left är nere
  let aud = false; // Om arrow up är nere
  let dash = false; // Om dash är aktivt
  let dashUsed = false; // Om dash är använd
  let inAir = false; // Om man är i luften
  let win = false; // Om man har vunnit

  // Definar några ljud filer
  const boing = new Audio("boing.mp3");
  const woosh = new Audio("woosh.mp3");

  // Basic controls (gå vänster, gå höger, hoppa och dash)
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        if (
          dash == false &&
          solids[level][block_right].x - (x + 30) > 0 &&
          dx != 2
        ) {
          dx = 4;
        }
        ard = true;
        break;
      case "ArrowLeft":
        if (
          dash == false &&
          x - (solids[level][block_left].x + solids[level][block_left].width) >
            0 &&
          dx != -2
        ) {
          dx = -4;
        }
        ald = true;
        break;
      case "ArrowUp":
        aud = true;
        if (dy == 0 && dash == false) {
          dy = -12;
        }
        break;
      case " ":
        if (
          (dashUsed == false && ard == true && dash == false) ||
          (dashUsed == false && ald == true && dash == false) ||
          (dashUsed == false && aud == true && dash == false)
        ) {
          dash = true;
          if (sound == true) {
            woosh.play();
          }
          dy = 0;
          if (ard == true && aud == false) {
            dx = 15;
            setTimeout(() => {
              dx = 0;
              dash = false;
              if (ard == true) {
                dx = 4;
              }
            }, 150);
          } else if (ard == true && aud == true) {
            dx = 11;
            dy = -15;
            setTimeout(() => {
              dx = 0;
              dy = 0;
              dash = false;
              if (ard == true) {
                dx = 4;
              }
            }, 150);
          } else if (ald == true && aud == true) {
            dx = -11;
            dy = -15;
            setTimeout(() => {
              dx = 0;
              dy = 0;
              dash = false;
              if (ald == true) {
                dx = -4;
              }
            }, 150);
          } else if (ald == true && aud == false) {
            dx = -15;
            setTimeout(() => {
              dx = 0;
              dash = false;
              if (ald == true) {
                dx = -4;
              }
            }, 150);
          } else if (ard == false && ald == false && aud == true) {
            dy = -15;
            dx = 0;
            setTimeout(() => {
              dy = 0;
              dash = false;
            }, 200);
          }
          dashUsed = true;
        }
    }
  });
  //vad som händer när man släpper en knapp
  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowRight":
        ard = false;
        if (dx > 0) {
          if (ald == false && dash == false) {
            dx = 0;
          } else if (dash == false) {
            dx = -4;
          }
        }
        break;
      case "ArrowLeft":
        ald = false;
        if (dx < 0) {
          if (ard == false && dash == false) {
            dx = 0;
          } else if (
            dash == false &&
            solids[level][block_right].x - (x + 30) > 2
          ) {
            dx = 4;
          }
        }
        break;
      case "ArrowUp":
        aud = false;
        break;
    }
  });

  //Dessa fyra funktioner kollar vilka block som runt karaktären (över, under, höger och vänster)
  function checkUnder(solids1, y, x) {
    closest = 10000;
    block_under = -1;
    for (let i = 0; i < solids1.length; i++) {
      if (
        y + 30 < solids1[i].y + 1 &&
        solids1[i].y - (y + 30) < closest &&
        closest >= 0 &&
        x < solids1[i].x + solids1[i].width &&
        x + 30 > solids1[i].x
      ) {
        closest = solids1[i].y - (y + 30);
        block_under = i;
      }
    }
    return block_under;
  }
  function checkAbove(solids1, y, x) {
    closest = 10000;
    block_above = -1;
    for (let i = 0; i < solids1.length; i++) {
      if (
        y >= solids1[i].y + solids1[i].height &&
        y - (solids1[i].y + solids1[i].height) < closest &&
        closest >= 0 &&
        x <= solids1[i].x + solids1[i].width &&
        x + 30 >= solids1[i].x
      ) {
        closest = y - (solids1[i].y + solids1[i].height);
        block_above = i;
      }
    }
    return block_above;
  }
  function checkRight(solids1, x) {
    closest = 10000;
    block_right = -1;
    for (let i = 0; i < solids1.length; i++) {
      if (
        y + 30 >= solids1[i].y &&
        y <= solids1[i].y + solids1[i].height + 1 &&
        x + 30 <= solids1[i].x &&
        solids1[i].x - (x + 30) < closest
      ) {
        closest = solids1[i].x - (x + 30);
        block_right = i;
      }
    }
    return block_right;
  }
  function checkLeft(solids1, x) {
    closest = 10000;
    block_left = -1;
    for (let i = 0; i < solids1.length; i++) {
      if (
        y + 30 >= solids1[i].y &&
        y <= solids1[i].y + solids1[i].height + 1 &&
        x >= solids1[i].x + solids1[i].width &&
        x - (solids1[i].x + solids1[i].width) < closest
      ) {
        closest = x - (solids1[i].x + solids1[i].width);
        block_left = i;
      }
    }
    return block_left;
  }
  let level = 0;

  //huvud funktion
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, 111150, 111150); // Denna rad rensar canvasen
    if (y + dy <= 0) {
      y += dy;
      level += 1;
      y = 530;
    } else if (y + 30 + dy >= 600) {
      y += dy;
      level -= 1;
      y = 1;
    }
    for (let i = 0; i < solids[level].length; i++) {
      // genererar alla block på respektiva levlar
      c.fillStyle = solids[level][i].color;
      c.fillRect(
        solids[level][i].x,
        solids[level][i].y,
        solids[level][i].width,
        solids[level][i].height
      );
    }
    //stjärna
    if (level == 2) {
      c.fillStyle = "yellow";
      c.beginPath();
      c.moveTo(608, 0.0);
      c.lineTo(641, 70);
      c.lineTo(718, 78.3);
      c.lineTo(662, 131);
      c.lineTo(675, 205);
      c.lineTo(608, 170);
      c.lineTo(541.2, 205);
      c.lineTo(555, 131);
      c.lineTo(501, 78);
      c.lineTo(575, 68);
      c.lineTo(608, 0);
      c.closePath();
      c.fill();
    }
    for (let i = 0; i < solids[level].length; i++) {
      // kollar om man är i luften
      for (let i = 0; i < solids[level].length; i++) {
        if (
          (y + 30 < solids[level][i].y && dash == false) ||
          (y >= solids[level][i].y + solids[level][i].height &&
            dash == false) ||
          (x >= solids[level][i].x + solids[level][i].width && dash == false) ||
          (x + 30 <= solids[level][i].x && dash == false)
        ) {
          inAir = true;
        } else {
          inAir = false;
          break;
        }
      }
      //collision
      block_under = checkUnder(solids[level], y, x);
      if (
        block_under != -1 &&
        y + 30 + dy > solids[level][block_under].y &&
        dash == false
      ) {
        dy = solids[level][block_under].y - (y + 30);
        y += dy;
        dy = 0;
        dashUsed = false;
      }
      block_above = checkAbove(solids[level], y, x);
      if (
        block_above != -1 &&
        y + dy <
          solids[level][block_above].y + solids[level][block_above].height
      ) {
        dy = -(
          y -
          (solids[level][block_above].y + solids[level][block_above].height)
        );
        y += dy;
        dy = 0;
      }
      block_left = checkLeft(solids[level], x);
      if (
        block_left != -1 &&
        x + dx < solids[level][block_left].x + solids[level][block_left].width
      ) {
        dx = -(
          x -
          (solids[level][block_left].x + solids[level][block_left].width)
        );
        x += dx;
        dx = 0;
      }
      block_right = checkRight(solids[level], x);
      if (block_right != -1 && x + 30 + dx > solids[level][block_right].x) {
        dx = solids[level][block_right].x - (x + 30);
        x += dx;
        dx = 0;
      }
    }
    if (
      block_under != -1 &&
      solids[level][block_under].y - (y + 30) == 0 &&
      dash == false
    ) {
      dashUsed = false;
    }
    if (
      block_under != -1 &&
      solids[level][block_under].y - (y + 30) == 0 &&
      solids[level][block_under].color == "lime"
    ) {
      dy = -15;
      if (sound == true) {
        boing.play();
      }
    }
    if (inAir == true) {
      dy += 0.8;
    }
    if (win == false) {
      y += dy;
      x += dx;

      c.fillStyle = "yellow";
      c.fillRect(x, y, 30, 30);
    }
    if (dy == 0 && aud == true && dash == false) {
      dy = -12;
    }
    if (
      block_under != -1 &&
      solids[level][block_under].color == "rgb(172, 230, 241)" &&
      dx == 4 &&
      solids[level][block_under].y - (y + 30) == 0 &&
      dash == false
    ) {
      dx = 2;
    } else if (
      block_under != -1 &&
      solids[level][block_under].color == "rgb(172, 230, 241)" &&
      dx == -4 &&
      solids[level][block_under].y - (y + 30) == 0 &&
      dash == false
    ) {
      dx = -2;
    }
    if (
      block_under != -1 &&
      solids[level][block_under].color == "rgb(172, 230, 241)" &&
      solids[level][block_under].y - (y + 30) > 0 &&
      dx == 2
    ) {
      dx = 4;
    } else if (
      block_under != -1 &&
      solids[level][block_under].color == "rgb(172, 230, 241)" &&
      solids[level][block_under].y - (y + 30) > 0 &&
      dx == -2
    ) {
      dx = -4;
    }
    if (level == 2 && y <= 205) {
      win = true
      sound = false
      document.getElementById("youwin").style.display = "block";
    }
  }
  animate();
}
gamemenu();
