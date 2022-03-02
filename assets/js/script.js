//Load board manually

const beginner = [
     "F------7------5-2------1---CF2----H1--9F-----71--9-D-5-2---F51---7H----CD5-------",
     "FH5C2917D971DH5C2F2CD7F1H59CF257D9H15D9F1H7C271H29CDF5H2C9DF517197H52FCD5F1C729H" 
]; 
const intermediate = [
     "--9-------D----F-75H-C1----15--D-CF-------D-H----9-------75----C-------1--2--C--", 
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

window.onload = function() {
    //Run startgame function when button is clicked
    id("start-btn").addEventListener("click", startGame);
}

function startGame() {
   //Choose game level
   let board;
   if (id("level-1").checked) board = beginner[0];
   else if (id("level-2").checked) board = intermediate[0];
   else board = expert[0];
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
   }else {
       qs("body").classList.add("dark");
   }
   }
function startTimer() {
    //Set time remainingbased on selection
    if (id("time-1").checked) time
}
   function generateBoard(board) {
       //Clear previous games 
       clearPrevious();
       //Let used to increment tile ids
       let idCount= 0;
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

           }
           //Assign tile id
           tile.id = idCount;
           //Increment next tile
           idCount ++;
           //Add tile class to all tiles
           tile.classList.add("tile");
           if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)) {
               tile.classList.add("bottomBorder");
             }
             if ((tile.id +1) % 9 == 3 || (tile.id +1) % 9 == 6) {
                 tile.classList.add("rightBorder");
             }
             //Add tiles to te board
             id("board").appendChild(tile);   
          }
        }


function clearPrevious() {
//Access all of the tiles
let tiles = qsa(".tile");
for (let i = 0; 1 < tiles.length; i++) {
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