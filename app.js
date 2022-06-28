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

let playerHull = document.querySelector(".playerHull");
let gameLog = document.querySelector(".gameflow");
let newLine = document.createElement("br");

//Create attacks
function playerAttacks(targetShip) {
  // let newText = document.createElement("p");
  // let newLine = document.createElement("br");
  // let gameLog = document.querySelector(".gameflow");
  if (Math.random() < playerShip["accuracy"]) {
    // gameLog.append(
    //   newLine,
    //   (newText.textContent = "You have damaged the enemy ship by 1 hull")
    console.log("You have damaged the enemy ship by 5 hull");
    targetShip["hull"] -= 5;
  } else {
    // gameLog.append(newLine, (newText.textContent = "You missed"));
    console.log("You missed!");
  }
}

function enemyAttacks(targetShip) {
  if (Math.random() < targetShip["accuracy"]) {
    console.log(
      `You have been damaged by the enemy ship by ${targetShip["firepower"]} hull.`
    );
    playerShip["hull"] -= targetShip["firepower"];
    console.log(playerShip["hull"]);
    // playerHull.textContent = `hello`;
  } else {
    console.log("The enemy ship missed!");
  }
}

//Creation callback function for game flow
function startGame(e) {
  //Generated battle log
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
        playerHull.textContent = `Hull: ${playerShip["hull"]}`;
      }
      console.log(`You have defeated ${targetShip["name"]}`);
      // let ans = prompt(
      //   "If you would like to continue to the next round, please type next! If you would like to give up, please type retreat"
      // );
      //If continue, generate a new ship each time one dies (hull = 0)
      //   if (ans === "next") {
      alienSquad.pop();
      //   } else if (ans === "retreat") {
      //     return console.log("Game over! You have given up on mankind...");
      //   }
      // }
      //Gameover due to hull === 0
      return console.log("Game over! Your ship has exploded!");
    }
    //Player wins when alien squad is eliminated
    console.log("You beat the game!");
  }
}

function nextRound() {
  if (playerShip["hull"] > 0 && alienSquad.length !== 0) {
    let targetShip = alienSquad[alienSquad.length - 1];
    console.log(targetShip);

    let alienShip = document.querySelector(".alienShip");
    alienShip.textContent = `${targetShip["name"]}`;
    let alienHull = document.querySelector(".alienHull");
    alienHull.textContent = `Hull: ${targetShip["hull"]}`;
    let alienFirepower = document.querySelector(".alienFirepower");
    alienFirepower.textContent = `Firepower: ${targetShip["firepower"]}`;
    let alienAccuracy = document.querySelector(".alienAccuracy");
    alienAccuracy.textContent = `Accuracy: ${targetShip["accuracy"]}`;

    while (targetShip["hull"] > 0) {
      playerAttacks(targetShip);
      if (targetShip["hull"] <= 0) {
        alienSquad.pop();
        return console.log(
          `You have defeated ${targetShip["name"]}, would you like to continue or retreat?`
        );
      } else {
        enemyAttacks(targetShip);
        playerHull.textContent = `Hull: ${playerShip["hull"]}`;
      }
    }
    alienSquad.pop();
    return console.log(
      `You have defeated ${targetShip["name"]}, would you like to continue or retreat?`
    );
    // let newText = document.createElement("p");
    // gameLog.append(
    //   (newText.textContent = `You have defeated ${targetShip["name"]}`)
    // );
    // let ans = prompt(
    //   "If you would like to continue to the next round, please type next! If you would like to give up, please type retreat"
    // );
    //If continue, generate a new ship each time one dies (hull = 0)
    //   if (ans === "next") {
  } else {
    let p = document.createElement("p");
    gameLog.append(
      newLine,
      (p.innerHTML = "There are no more aliens to fight.")
    );
  }
}

function endGame() {
  let gameLog = document.querySelector(".gameflow");
  let p = document.createElement("p");
  gameLog.append(
    newLine,
    (p.innerHTML = "You have abandoned mankind...there is no place to run"),
    newLine
  );
}

let instructions = document.querySelector(".instructions");
instructions.addEventListener("mouseover", () => {
  let gameplay = document.querySelector(".gameplay");
  gameplay.style.display = "block";
});

instructions.addEventListener("mouseout", () => {
  let gameplay = document.querySelector(".gameplay");
  gameplay.style.display = "none";
});

let battleBtn = document.querySelector(".battle");
battleBtn.addEventListener("click", nextRound);

let retreat = document.querySelector(".retreat");
retreat.addEventListener("click", endGame);
