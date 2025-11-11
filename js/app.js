/*-------------------------------- Constants --------------------------------*/
// All possible winning combinations
const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top-left
  [2, 4, 6]  // diagonal from top-right
];

/*---------------------------- Variables (state) ----------------------------*/
let board;       // stores current board state
let playerTurn;  // current player ('X' or 'O')
let winner;      // stores winner state
let tie;         // stores tie state

/*------------------------ Cached Element References ------------------------*/
// Find me the first element in the DOM that has the ID message
const messageEl = document.querySelector('#message');

// Stores all 9 square elements in a list
const squareEls = document.querySelectorAll('.sqr');

// Cached reference to the board container (only runs once). Stores the main container of the board
const boardEl = document.getElementById('board');

const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
// Loop over board and update each square
const updateBoard = () => {
  board.forEach((element, index) => {
    // Get the corresponding square element
    const square = squareEls[index];
    // Put the letter in the square ('X', 'O', or '')
    square.textContent = element;
    // Optional: Add styling based on the value
    if (element === 'X') {
      square.style.color = 'blue';
    } else if (element === 'O') {
      square.style.color = 'red';
    } else {
      square.style.color = 'black'; // or reset style
    }
  });
};

// Update the message based on game state
const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${playerTurn}'s turn.`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `${playerTurn} wins!`;
  }
};

// Handle a click on a square
const handleClick = (event) => {
  // Only respond if a square was clicked
  if (!event.target.classList.contains('sqr')) return;

  // Takes element user clicked on (event.target) and accesses id attribute and converts string to a number to update positon in the board array
  const squareIndex = parseInt(event.target.id);

  // If the square is taken or game is over, ignore click
  if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) return;

  // Place the player's piece
  board[squareIndex] = playerTurn;
  render();
  
  checkForWinner();
  switchPlayerTurn();

};

const switchPlayerTurn = () => {
    if (winner) return;

    if (playerTurn === 'X') {
        playerTurn = 'O';
    } else {
        playerTurn = 'X';
    }
    updateMessage();
};




// Renders the board and message
const render = () => {
  updateBoard();
  updateMessage();

};


const checkForWinner = () => {
   for (let i = 0; i < winningCombos.length; i++) {
    const [first, second, third] = winningCombos[i];

    if (
        board[first] !== '' &&
        board[first] === board[second] &&
        board[first] === board[third]
    ) {
       if(winner = true) {
        messageEl.textContent = `${playerTurn} wins!`;
       }
        return;
    }
}
};

const checkForTie = () => {
    if (winner === true) {
        return;
    } else if (board.includes('')) {
        tie = false;
    } else {
        tie = true;
    }
}


// Initialize the board
const init = () => {
  // Defining the board from scratch, resetting all squares to empty strings
  board = ['', '', '', '', '', '', '', '', ''];
  playerTurn = 'X';
  winner = false;
  tie = false;
  console.log('init called');
  render();
  checkForTie();
};

/*----------------------------- Event Listeners -----------------------------*/
// Whenever a click happens anywhere inside the element with id="board", run the function called handleClick
boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init)
/*----------------------------- Initialize -----------------------------*/
init();
 