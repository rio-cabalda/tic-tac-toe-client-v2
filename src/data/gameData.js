export const newBoard = Array(9).fill('');

export const winnerArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

export const getAIMove = (board, winnerArr,aiSymbol,playerSymbol) => {
    for (const winningCombination of winnerArr) {
      const [a, b, c] = winningCombination;
        if (board[a] === aiSymbol && board[b] === aiSymbol && board[c] === '') {
          return c; // Winning Move of AI
        }
    
        else if (board[a] === aiSymbol && board[c] === aiSymbol && board[b] === '') {
          return b; // Winning Move of AI
        }
    
        else if (board[b] === aiSymbol && board[c] === aiSymbol && board[a] === '') {
          return a; // Winning Move of AI
        }      
    }

    for(const counterCombination of winnerArr){
      const [a, b, c] = counterCombination;
      if (board[a] === playerSymbol && board[b] === playerSymbol && board[c] === '') {
        return c; // Counter Move of AI
      }
  
      else if (board[a] === playerSymbol && board[c] === playerSymbol && board[b] === '') {
        return b; // Counter Move of AI
      }
  
      else if (board[b] === playerSymbol && board[c] === playerSymbol && board[a] === '') {
        return a; // Counter Move of AI
      }
    }

    const emptyIndices = board.reduce((indices, value, index) => {
        if (value === '') {
          indices.push(index);
        }
        return indices;
      }, []);
      
      // Function to get a random index from the array
      const getRandomIndex = (arr) => arr[Math.floor(Math.random() * arr.length)];
      
      // Get a random index from the empty indices
      const randomEmptyIndex = getRandomIndex(emptyIndices);

    return randomEmptyIndex; // Random move of AI
  };


  export const aiMoveMessages = [
    'My turn now.',
    'Here I go!',
    'Thinking ahead.',
    'Strategy engaged!',
    'Watch and learn.',
    'Calculating move.',
    'Let me think.',
    'Executing move.',
    'Masterful play.',
    'Game on, buddy!',
  ];