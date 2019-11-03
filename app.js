/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable max-len */

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let player, playerScore, kocka1, kocka2, zavrsenaIgra, brojDoKraja;
kocka1 = document.querySelector('[alt="Dice1"]');
kocka2 = document.querySelector('[alt="Dice2"]');

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  brojDoKraja = Number(document.querySelector('input[type="number"]').value);
  document.querySelector('input[type="number"]').setAttribute("disabled", "");
  if (!zavrsenaIgra) {
    kocka1.style.display = "block";
    kocka2.style.display = "block";

    let broj1 = Math.floor(Math.random() * 6) + 1;
    kocka1.src = "dice-" + broj1 + ".png";

    let broj2 = Math.floor(Math.random() * 6) + 1;
    kocka2.src = "dice-" + broj2 + ".png";

    if (broj1 === 1) {
      kocka1.classList.add("crvena");
    } else {
      kocka1.classList.remove("crvena");
    }
    if (broj2 === 1) {
      kocka2.classList.add("crvena");
    } else {
      kocka2.classList.remove("crvena");
    }

    if (broj1 === 6 && broj2 === 6) {
      kocka1.classList.add("plava");
      kocka2.classList.add("plava");
    } else {
      kocka1.classList.remove("plava");
      kocka2.classList.remove("plava");
    }

    if (broj1 === 6 && broj2 === 6) {
      restartujIgrača();
      nextPlayer();
    } else if (broj1 !== 1 && broj2 !== 1) {
      playerScore += broj1 + broj2;
      document.getElementById("current-" + player).textContent = playerScore;
    } else {
      document.getElementById("current-" + player).textContent = 0;
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  let scoreHold = document.getElementById("score-" + player);
  scoreHold.textContent = playerScore + Number(scoreHold.textContent);
  document.getElementById("current-" + player).textContent = 0;
  playerScore = 0;
  if (Number(scoreHold.textContent) >= brojDoKraja) {
    kocka1.style.display = "none";
    kocka2.style.display = "none";
    document.querySelector(".player-" + player + "-panel").classList.add("winner");
    document.querySelector("#name-" + player).textContent = "WINNER";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    zavrsenaIgra = true;
  } else {
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  player = player === 0 ? 1 : 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // kocka.style.display = 'none';
  playerScore = 0;
}

function init() {
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  kocka1.style.display = "none";
  kocka2.style.display = "none";
  playerScore = 0;
  player = 0;
  zavrsenaIgra = false;
  document.querySelector('input[type="number"]').removeAttribute("disabled", "");
  kocka1.classList.remove("crvena");
  kocka2.classList.remove("crvena");
}
function restartujIgrača() {
  document.getElementById("current-" + player).textContent = 0;
  document.getElementById("score-" + player).textContent = 0;
}
