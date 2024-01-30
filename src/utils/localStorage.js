import {useEffect, useState } from "react";


export const useGameDataToLocalStorage = () => {
  const [scoreBoard_ls, setScoreBoard] = useState([]);
  const [error_ls, setError] = useState(false);
  const [isLoading_ls, setIsLoading] = useState(true);
    const gameDataKey = 'gameData';

useEffect(()=>{
  const getData = () => {
    setIsLoading(true);
    setError(false)
  // Check if there is already data in local storage
  const existingGameData = localStorage.getItem(gameDataKey);

  if (!existingGameData) {
    // If no data exists, set the initial data to local storage
    const initialGameData = [];

    // Convert the object to a JSON string and store it in local storage
    try {
      localStorage.setItem(gameDataKey, JSON.stringify(initialGameData));
      setIsLoading(false);
      setError(false)
      setScoreBoard(initialGameData);
    } catch (error) {
      setIsLoading(false);
      setError(true)
    }
    
  } else {
    // If data already exists
    setIsLoading(false);
    setError(false)
    setScoreBoard(existingGameData);
  }
  
}
getData();
},[])
return { scoreBoard_ls,error_ls,isLoading_ls}
  };


  export const updateGameDataArrayInLocalStorage = (newGameData) => {
    const gameDataKey = 'gameData';
  
    // Retrieve existing game data array from local storage
    const existingGameDataString = localStorage.getItem(gameDataKey);
  
    if (existingGameDataString) {
      // Parse the existing game data JSON string to get the array
      const existingGameDataArray = JSON.parse(existingGameDataString);
  
      // Update the existing game data array with the new data
      existingGameDataArray.unshift(newGameData);
  
      // Convert the updated game data array to a JSON string
      const updatedGameDataString = JSON.stringify(existingGameDataArray);
  
      // Store the updated JSON string in local storage under the key 'gameData'
      localStorage.setItem(gameDataKey, updatedGameDataString);
    } 
  };