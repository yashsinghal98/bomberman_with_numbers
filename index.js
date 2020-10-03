let bombarr = [];//array containing indexes for the bombs in the grid
let gamestart = true;//gameplay is of or off
let countcorrect = 0;//count the score

//creating bombs at random indexes in the grid
(function randomarr() {
  for (let i = 0; i < 7; i++) {
    let num = Math.floor(Math.random() * 81);
    if (bombarr.indexOf(num) !== -1) {
      i--;
    } else {
      bombarr.push(num);
    }
  }
})();

//checking the surrounding of the index clicked,returns the count of bombs in the surrounding
function checksurr(str) {
  let num = 0,
    i = str / 10,
    j = str % 10,
    countbomb = 0;
  i = Math.trunc(i);
  if (i - 1 >= 0 && j - 1 >= 0) {
    num = (i - 1) * 10 + (j - 1);
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (i - 1 >= 0) {
    num = (i - 1) * 10 + j;
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (i - 1 >= 0 && j + 1 <= 9) {
    num = (i - 1) * 10 + (j + 1);
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (j - 1 >= 0) {
    num = i * 10 + (j - 1);
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (j + 1 <= 9) {
    num = i * 10 + (j + 1);
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (i + 1 < 9 && j - 1 >= 0) {
    num = (i + 1) * 10 + (j - 1);
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (i + 1 < 9) {
    num = (i + 1) * 10 + j;
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  if (i + 1 < 9 && j + 1 <= 9) {
    num = (i + 1) * 10 + (j + 1);
    if (bombarr.indexOf(num) !== -1) countbomb++;
  }
  return countbomb;
}

//check whether the button clicked has bomb in it or not
function check(event, str) {
  if (gamestart === false) return;
  //for checking that the click is right or left i.e 1=left click,2=right click
  if (event.which === 1) {
    str = +str;
    if (bombarr.indexOf(str) === -1) {
      if (
        document
          .getElementById(str)
          .style.getPropertyValue("background-color") !== "green"
      ) {
        let countbomb = checksurr(str);
        countcorrect++;
        document.getElementById(`${str}`).style.backgroundColor = "green";
        document.getElementById(`${str}`).innerHTML = countbomb;
        document.getElementById(
          "gamescore"
        ).innerHTML = `Score:${countcorrect}`;
        if (countcorrect === 83) {
          gamestart=false;
          alert("Congrats!!You have won the game");
        }
      }
    } else {
      for (let i = 0; i < 7; i++) {
        str = bombarr[i];
        str = str.toString();
        console.log(str);
        document.getElementById(str).innerHTML = "☠";
        document.getElementById(str).style.backgroundColor = "red";
      }
      setTimeout(function () {
        alert(`Your Score is:${countcorrect}`);
      }, 500);
      gamestart = false;
    }
  } else {
    if (
      document
        .getElementById(str)
        .style.getPropertyValue("background-color") !== "green") {
      document.getElementById(str).innerHTML = "⛔";
    }
  }
}

//building the grid
function build() {
  let name1 = document.getElementById("name");//Name of the player
  if (name1.value === ""||name1.value==="Name") return;
  else {
    //removing the div element that takes the input from the user
    let temp = document.getElementById("startname");
    temp.remove();
    document.getElementById("playername").innerHTML = `Name:${name1.value}`;
  }
  let ele = document.createElement("div");
  ele.setAttribute("id", "table");
  ele.setAttribute("class", "table");
  for (let i = 0; i < 9; i++) {
    let rowele = document.createElement("div");
    rowele.setAttribute("id", "row");
    rowele.setAttribute("class", "row");
    for (let j = 0; j <= 9; j++) {
      let newele = document.createElement("div");
      let idval = i * 10 + j;
      newele.setAttribute("id", `${idval}`);
      newele.setAttribute("class", "cell");
      newele.addEventListener("mousedown", function () {
        check(event, `${idval}`);
      });
      newele.setAttribute("oncontextmenu", "return false;");
      rowele.appendChild(newele);
    }
    ele.appendChild(rowele);
  }
  document.body.appendChild(ele);
}

//reloading the page
function Reset() {
  location.reload();
}
