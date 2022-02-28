//Load board manually

const beginner = [
     "F------7------5-2------1---CF2----H1—9F-----71--9-D-5-2---F51---7H----CD5-------",
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
   }

   function generateBoard(board){
       //Clear previous games 
       clearPrevious();
}

function clearPrevious() {
//Access all of the tiles
let tiles = qsa(".tile");
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