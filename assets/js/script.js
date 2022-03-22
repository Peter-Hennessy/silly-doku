//Load board manually

const beginner = [
    "F------7------5-2------1---CF2----H1--9F-----71--9-D-5-2---F51---7H----CD5---7---",
    "FH5C2917D971DH5C2F2CD7F1H59CF257D9H15D9F1H7C271H29CDF5H2C9DF517197H52FDCD5F1C729H" 
]; 

const intermediate = [
    "F-9---5-C2D----F1---7C--9-----2D7--9-2F-----H7--F--1--H9-----CF-F5----D-----FC--5",
    "F19D725HC2DC9H5F175H7C1F92D15H2D7CF992F5C1D7H7CDF9H152H9175D2CFCF5H297D1D721FCH95"
];
const expert = [
    "-1-5-------97-D2----5----7-5---C---7-F--2-D1---H--5---1-D------2-C-----9-7----H--", 
    "7125HCF9DFC971D25HHD52F917C521DCF9H7CF792HD15D9H175C2F1HDF975C225CHD17F997FC52HD1" 
];


//Create variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function () {
    //Run startgame function when button is clicked
    id("start-btn").addEventListener("click", startGame);
    //Add eventlistener to each number & each container
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].addEventListener("click", function () {
            //If selectiion is not disable
            if (!disableSelect) {
                //If number is already selected
                if (this.classList.contains("selected")) {
                    //Then remove selection
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    //Deselect all other numbers
                    for (let i = 0; i < 9; i++) {
                        id("number-container").children[i].classList.remove("selected");
                    }
                    //Select it an update selectedNum Variable
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        });

    }
}

function startGame() {
    //Choose game level
    let board;
    if (id("level-1").checked)
     {
        board = beginner[0];
    } else if 
    (id("level-2").checked)
     {
        board = intermediate[0];
    } else { 
        board = expert[0];
    }
    //Set the ammount of lives to 5 and enable selecting numbers, letters & tiles
    lives = 5;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining: 5";
    //Create board based on level selected
    generateBoard(board);
    //Start Timer
    startTimer();
    //Sets the theme based on input
    if (id("theme-1").checked) {
        qs("body").classList.remove("dark");
    } else {
        qs("body").classList.add("dark");
    }
    //Show the Number &  Letter Container
    id("number-container").classList.remove("hidden");
}

function startTimer() {
    //Set time remainingbased on selection
    if (id("time-1").checked) timeRemaining = 300;
    else if (id("time-2").checked) timeRemaining = 600;
    else timeRemaining = 900;
    //Set the timer for first second
    id("timer").textContent = timeConversion(timeRemaining);
    timer = setInterval(function () {
        timeRemaining--;
        // [If no time remaining the game shall end
        if (timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}
// Converts seconds into string of MM:SS format
function timeConversion(time) {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;


}

function generateBoard(board) {
    //Clear previous games 
    clearPrevious();
    //Let used to increment tile ids
    let idCount = 0;
    //Create 81 Tiles
    for (let i = 0; i < 81; i++) {
        //Create a new paragraph element
        let tile = document.createElement("p");
        //If tile is not meant to be blank
        if (board.charAt(i) != "-") {
            //Set Tile text to correct number or letter
            tile.textContent = board.charAt(i);

        } else {
            //Add click event listener to tile
            tile.addEventListener("click", function () {
                //if the tile is aldready selected
                if (!disableSelect) {
                    //If Tile is already selected
                    if (tile.classList.contains("selected")) {
                        //Then remove selection
                        tile.classList.remove("selected");
                        selectedTile = null;
                    } else {
                        //Deselect all othe tiles
                        for (let i = 0; i < 81; i++) {
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //Add selection and update variable
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }

            });

        }
        //Assign tile id
        tile.id = idCount;
        //Increment next tile
        idCount++;
        //Add tile class to all tiles
        tile.classList.add("tile");
        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)) {
            tile.classList.add("bottomBorder");
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder");
        }
        //Add tiles to te board
        id("board").appendChild(tile);
    }
}

function updateMove() {
    // if a tile and number/letter is selected
    if (selectedTile && selectedNum) {
        //Set the tile to the correct number/letter
        selectedTile.textContent = selectedNum.textContent;
        //if the number/letter matches the corresponding number/letter in the solution key
        if (checkCorrect(selectedTile)) {
            //Deselect the tile 
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //Clear the selected Variables
            selectedNum = null;
            selectedTile = null;
            //Check if board is completed
            if (checkDone()) {
                endGame();
             }

            // If the number/letter does not match the solution key
        } else{
            //Disable Seletin a new number/letter for one second
            disableSelect = true;
            // Make tile change color
            selectedTile.classList.add("incorrect");
            //restart in one second
            setTimeout(function() {
                // Subtract lives by one
                lives --;
                // If No Lives remain GAME OVER!
                if (lives === 0) {
                    endGame();
                } else {
                      //If lives is not equal to zero
                      // Update lives text
                      id ("lives").textContent = "Lives Remaining: "  + lives;
                      //Re-enable selecting Number & tiles
                      disableSelect = false;
                }
                // Restore tile color and remove selected from both
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                // Clear the tile text and clear selected variable
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;


            }, 1000);
        }
    }
}
function checkDone() {
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === "") return false;

    }
    return true;
}

function endGame() {
    //Disable moves & stops timer
    disableSelect = true;
    clearTimeout(timer);
    //Display win or loose message
    if (lives === 0 || timeRemaining === 0) {
        id("lives").textContent = "Game Over!";
    }else {
        id("lives").textContent = "BOOM-SHAKA-LAKA YOU WON!!!";
    }
    }


function checkCorrect(tile) {
    //Set solution based od level selected
    let solution;
    if (id("level-1").checked) solution = beginner[1];
    else if (id("level-2").checked) solution = intermediate[1];
    else solution = expert[1];
    // If tile number/letter is the same as solution's number/letter
    if (solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function clearPrevious() {
    //Access all of the tiles
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }
    //If there is a timer clear it
    if (timer) clearTimeout(timer);
    //Deselect any numbers
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }
    //Clear selected Variables
    selectedTile = null;
    selectedNum = null;
}


//Helper Functions
function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);

}