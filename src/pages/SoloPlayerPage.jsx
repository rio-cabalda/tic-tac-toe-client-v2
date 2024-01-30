import { useEffect, useState } from "react";
import { newBoard, winnerArr } from "../data/gameData";
import { useLocation, useNavigate } from "react-router-dom";
import InGameModal from "../components/feature/InGameModal";
import XCard from "../components/XCard";
import OCard from "../components/OCard";
import {getAIMove} from '../data/gameData';
import {aiMoveMessages} from '../data/gameData';


function GameplayPage() {
    const location = useLocation();
    const  gamePlayers  = location.state || null;
    const [currentTurn, setCurrentTurn]=useState(1);
    const [turn,setTurn] = useState(gamePlayers?.selectSymbol);
    const [winnerText,setWinnerText] = useState('');
    const [turnArr, setTurnArray] = useState(newBoard);
    const [finishRound, setFinishRound] = useState(false);
    const [AITurnBtn, setAITurnBtn] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [AItext, setAItext] = useState('');
    // Use to get the Player's name
    const navigate = useNavigate();

    const [gameData, setGameData] = useState({
        rounds: 1,
        player1Data: {
            name: gamePlayers?.soloPlayer,
            wins: 0,
            losses: 0,
            draws: 0
        },
        player2Data: {
            name: 'AI',
            wins: 0,
            losses: 0,
            draws: 0
        }
    });
    useEffect(()=>{
        if(!gamePlayers){
            navigate('/');
            return;
        }    
    },[gamePlayers,navigate]);

    useEffect(()=>{
        const textDuration = setTimeout(() => {
            if(AItext){
                setAItext('');
            }
        }, 5000);

        return ()=> clearTimeout(textDuration);
        
    },[AItext])

    
    const checkWinner = (paramTurnArr) => {
        for(let i=0; winnerArr.length > i; i++ ){
            const winnerComb = winnerArr[i];

            //If there is a winner
            if(paramTurnArr[winnerComb[0]] === paramTurnArr[winnerComb[1]] && paramTurnArr[winnerComb[1]] === paramTurnArr[winnerComb[2]] && paramTurnArr[winnerComb[2]] !== ''){ 
                setAItext('');
                setFinishRound(true);
                setTimeout(() => {
                    setModalIsOpen(true);
                }, 2000);
                
                //Record data if there is a winner
                if(paramTurnArr[winnerComb[0]] === gamePlayers?.selectSymbol){
                    setWinnerText(gamePlayers.soloPlayer);
                    setGameData((prevData)=>({
                        ...prevData,
                        rounds: prevData.rounds+1,
                        player1Data:{...prevData.player1Data, wins: prevData.player1Data.wins + 1},
                        player2Data: {...prevData.player2Data, losses: prevData.player2Data.losses + 1}
                    }));
                }
                else{
                    setWinnerText("AI");
                    setGameData((prevData)=>({
                        ...prevData,
                        rounds: prevData.rounds+1,
                        player1Data:{...prevData.player1Data, losses: prevData.player1Data.losses + 1},
                        player2Data: {...prevData.player2Data, wins: prevData.player2Data.wins + 1}
                    }));

                } 
                return true;
            }    
        }

        // If no winner or Draw 
        if(paramTurnArr.every((value) => value !== '')){
            setAItext('');
            setFinishRound(true);
            setWinnerText('draw');
            setGameData((prevData)=>({
                ...prevData,
                rounds: prevData.rounds+1,
                player1Data:{...prevData.player1Data, draws: prevData.player1Data.draws + 1},
                player2Data: {...prevData.player2Data, draws: prevData.player2Data.draws + 1}
            }));
            setTimeout(() => {
                setModalIsOpen(true);
            }, 2000);
            return true;
        }
        return false;
    }

    const clearBoard = () => {
        const AIturn = turn === 'x'? 'o' :'x';
        if(finishRound){    
            setTurnArray(newBoard);
            setFinishRound(false);
            setCurrentTurn(1);
            setModalIsOpen(false);
            setWinnerText('');
            setAITurnBtn(false)
            setTurn(gamePlayers.selectSymbol);

            if(gameData.rounds %2 === 0){
                // SET turn to AI
                console.log('AI turn first');
                // setIsAIFirstTurn(true);
                setAITurnBtn(true);
                setCurrentTurn(0);
                setTimeout(() => {
                    let newBoxArr = [...newBoard];
                    const aiWinningMove = getAIMove(newBoxArr, winnerArr,AIturn,turn);
                    newBoxArr[aiWinningMove] = AIturn;
                    setTurnArray(newBoxArr);
                    checkWinner(newBoxArr);
                    setCurrentTurn((prev)=>prev+1);
                    setAITurnBtn(false);
                    }, 4000);
                }
        }
    }

    const handleSelectedBox = async(e,index) => {
        e.preventDefault();
        const AIturn = turn === 'x'? 'o' :'x';
        if(e.target.textContent === '' && !finishRound){

            let newBoxArr = [...turnArr];
            newBoxArr[index] = turn;
            setTurnArray(newBoxArr);
            const checkWin = checkWinner(newBoxArr);
            setCurrentTurn((prev)=>prev+1);
            setAITurnBtn(true);// to disable button temporary

            
            //AI function
            if(!checkWin){
                const randomIndex = Math.floor(Math.random() * aiMoveMessages.length);
                setAItext(aiMoveMessages[randomIndex]);
                await new Promise((resolve,reject) => {

                try {
                    setTimeout(() => {
    
                    const aiWinningMove = getAIMove(newBoxArr, winnerArr,AIturn,turn);
                    newBoxArr[aiWinningMove] = AIturn;
                    setTurnArray(newBoxArr);
                    checkWinner(newBoxArr);
                    setCurrentTurn((prev)=>prev+1);
                    setAITurnBtn(false)
                    resolve(); // Resolve the promise to indicate the setTimeout has completed
                    }, 4000);

                } catch (error) {
                    reject(error); // Reject the promise in case of an error
                  }
                });
            }
            
        }
    }
    
  return (
    <>
        {/* <main className="w-full p-4 min-h-screen bg-gradient-to-tr from-[#420292] to-[#BC4CF2]"> */}
        {modalIsOpen? <InGameModal 
        gameData={gameData}
        winnerText={winnerText}
        clearBoard={clearBoard}
        setModalIsOpen={setModalIsOpen}
        /> : null }
        
        <header className="h-40 flex justify-center items-center gap-2 mt-8 text-white">
            <div className={`relative w-36 flex flex-col justify-center items-center border-solid border-4 ${currentTurn%2 !== 0? ' border-[#FF9D05]':'border-[#9836D6]'} p-4 bg-gradient-to-tr from-[#9A11E7] to-[#D006E4] rounded-lg shadow-md duration-200`}>
                {currentTurn%2 !== 0 &&
                    <div className="absolute -top-6 left-0 w-full font-bold uppercase text-center text-[#FF9D05]">Your Turn</div>
                }
                <h3 className={`text-center text-2xl uppercase font-semibold ${currentTurn % 2 !== 0? ' text-[#FF9D05]':''}`}>{gameData.player1Data.name}</h3>
                <h4 className="text-center uppercase  font-semibold">Wins: {gameData.player1Data.wins}</h4>
                <label className="h-12 w-12 border-2 border-white rounded-lg flex justify-center items-center text-3xl font-extrabold bg-gradient-to-bl from-[#A400F4] to-[#5F03A2] ">
                    <span className={`${gamePlayers?.selectSymbol ==='o'? 'hidden':''} hover:bg-white text-transparent bg-gradient-to-t from-[#EE090C] to-[#FF6365] bg-clip-text -translate-y-1 duration-200  cursor-pointer`}>x</span>
                    <span className={`${gamePlayers?.selectSymbol ==='x'? 'hidden':''} text-transparent bg-gradient-to-t from-[#FF9D05] to-[#FBE49C] bg-clip-text -translate-y-1 duration-200 cursor-pointer`}>o</span>
                </label>
            </div>

            <div className={`relative w-36 flex flex-col justify-center items-center border-solid border-4  ${currentTurn%2 === 0? ' border-4 border-[#FF9D05]':'border-[#9836D6]'} p-4 bg-gradient-to-tl from-[#9A11E7] to-[#D006E4] rounded-lg shadow-md duration-200`}>
                
                {/* Ai Text */}
               {AItext && <p className="absolute text-[10px] text-center text-white -top-3 left-1/2 -translate-x-1/2 bg-[#FF9D05] p-1 customClipPath w-32 h-10 rounded-tl-lg rounded-tr-lg leading-none duration-1000">{AItext}</p>}

                {/* <img className="absolute top-0 left-1/2 -translate-x-1/2 h-[4rem] object-cover z-20" src={aiIcon} alt="AI" /> */}

                {currentTurn%2 === 0 &&
                    <div className="absolute z-30 -top-6 left-0 w-full font-bold uppercase text-center text-[#FF9D05]">AI Turn</div>
                }
                <h3 className={`relative z-30 text-center text-2xl uppercase font-semibold ${currentTurn%2 === 0? ' text-[#FF9D05]':''} overflow-visible`}>{gameData.player2Data.name}
                </h3>
                <h4 className="text-center uppercase  font-bold z-30">Wins: {gameData.player2Data.wins}</h4>
                <label className="h-12 w-12 border-2 z-30 border-white rounded-lg flex justify-center items-center text-3xl font-extrabold bg-gradient-to-bl from-[#A400F4] to-[#5F03A2]">
                    <span className={`${gamePlayers?.selectSymbol ==='x'? 'hidden':''} hover:bg-white text-transparent bg-gradient-to-t from-[#EE090C] to-[#FF6365] bg-clip-text -translate-y-1 duration-500  cursor-pointer`}>x</span>
                    <span className={`${gamePlayers?.selectSymbol ==='o'? 'hidden':''} text-transparent bg-gradient-to-t from-[#FF9D05] to-[#FBE49C] bg-clip-text -translate-y-1 duration-500 cursor-pointer`}>o</span>
                </label>
            </div>
        </header>
        
        <div className="mt-5 mx-auto grid grid-cols-3 justify-center gap-4 w-fit p-5 bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] rounded-lg shadow-xl">
            {
                turnArr.map((_,index) => {
                return (
                    <button disabled={finishRound || AITurnBtn} key={index} className={`w-16 h-16 bg-gradient-to-t from-[#1A1C4F] to-[#1A1C4F] capitalize disabled:bg-slate-500 rounded-lg  shadow-xl
                    duration-1000 overflow-hidden`}
                    onClick={(e)=>handleSelectedBox(e,index)}
                    >{(turnArr[index] === 'x' && <XCard />)|| (turnArr[index] === 'o' && <OCard />)}
                    </button>
                        )
                    })
            }
        </div>
        <div className="mt-5">
           <p className="text-transparent bg-gradient-to-r from-[#FFDC80]  via-[#FE9C05]  to-[#FE9C05] bg-clip-text font-semibold">Round: <span className="font-extrabold text-lg">{gameData.rounds}</span></p>
        </div>
    </>
  )
}



export default GameplayPage