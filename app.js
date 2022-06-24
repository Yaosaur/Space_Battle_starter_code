//Create a class for ships
class Ship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}
//Random stat generator for alien ships
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomHull() {
  return randomNum(3, 6);
}

function getRandomFirepower() {
  return randomNum(2, 4);
}

function getRandomAccuracy() {
  return randomNum(6, 8) / 10;
}

//Create player 1 ship
let playerShip = new Ship("Player", 20, 5, 0.7);
//Create attacks
function playerAttacks(targetShip) {
  if (Math.random() < playerShip["accuracy"]) {
    console.log("You have damaged enemy ship by 1 hull.");
    targetShip["hull"]--;
  } else {
    console.log("You missed!");
  }
}

function enemyAttacks(targetShip) {
  if (Math.random() < targetShip["accuracy"]) {
    console.log("You have been damaged by the enemy ship by 1 hull.");
    playerShip["hull"]--;
  } else {
    console.log("The enemy ship missed!");
  }
}
//Creation callback function for game flow
function startGame() {
  //Randomly generated alien squad for each game set
  let alienSquad = [];
  for (let i = 6; i >= 1; i--) {
    alienSquad.push(
      new Ship(
        `Alien Ship ${i}`,
        getRandomHull(),
        getRandomFirepower(),
        getRandomAccuracy()
      )
    );
  }

  while (alienSquad.length !== 0) {
    while (playerShip["hull"] > 0) {
      let targetShip = alienSquad[alienSquad.length - 1];
      while (targetShip["hull"] > 0) {
        playerAttacks(targetShip);
        enemyAttacks(targetShip);
      }
      console.log(`You have defeated ${targetShip["name"]}`);
      let ans = prompt(
        "If you would like to continue to the next round, please type next! If you would like to give up, please type retreat"
      );
      //If continue, generate a new ship each time one dies (hull = 0)
      if (ans === "next") {
        alienSquad.pop();
      } else if (ans === "retreat") {
        return console.log("Game over! You have given up on mankind...");
      }
    }
    //Gameover due to hull === 0
    return console.log("Game over! Your ship has exploded!");
  }
  //Player wins when alien squad is eliminated
  console.log("You beat the game!");
}
let playBtn = document.querySelector(".play");
playBtn.addEventListener("click", startGame);
