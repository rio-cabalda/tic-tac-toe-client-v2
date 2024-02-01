import { useEffect, useState } from "react";
import { newBoard, winnerArr } from "../data/gameData";
import { useLocation, useNavigate } from "react-router-dom";
import InGameModal from "../components/feature/InGameModal";
import xIcon from '../assets/x.png';
import oIcon from '../assets/o.png';

function MultiPlayerPage() {
    const [currentTurn, setCurrentTurn]=useState(0);
    const [turn,setTurn] = useState('x');
    const [winnerText,setWinnerText] = useState('');
    const [turnArr, setTurnArray] = useState(newBoard);
    const [finishRound, setFinishRound] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const location = useLocation();
    // Use to get the Player's name
    const  gamePlayers  = location.state || null;
    const navigate = useNavigate();
    const [gameData, setGameData] = useState({
        rounds: 1,
        player1Data: {
            name: gamePlayers?.player1,
            wins: 0,
            losses: 0,
            draws: 0
        },
        player2Data: {
            name: gamePlayers?.player2,
            wins: 0,
            losses: 0,
            draws: 0
        }
    });

    console.log(gameData);
    useEffect(()=>{
        if(!gamePlayers){
            navigate('/');
        }
    },[gamePlayers,navigate]);
    
    const checkWinner = (paramTurnArr) => {
        for(let i=0; winnerArr.length > i; i++ ){
            const winnerComb = winnerArr[i];

            //If there is a winner
            if(paramTurnArr[winnerComb[0]] === paramTurnArr[winnerComb[1]] && paramTurnArr[winnerComb[1]] === paramTurnArr[winnerComb[2]] && paramTurnArr[winnerComb[2]] !== ''){ 
            setFinishRound(true);
            setTurn('x');
            setModalIsOpen(true);
            //Record data if there is a winner
            if(paramTurnArr[winnerComb[0]] === 'x'){
                setWinnerText(gamePlayers?.player1);
                setGameData((prevData)=>({
                    ...prevData,
                    rounds: prevData.rounds+1,
                    player1Data:{...prevData.player1Data, wins: prevData.player1Data.wins + 1},
                    player2Data: {...prevData.player2Data, losses: prevData.player2Data.losses + 1}
                }));
            }
            else{
                setWinnerText(gamePlayers?.player2);
                setGameData((prevData)=>({
                    ...prevData,
                    rounds: prevData.rounds+1,
                    player1Data:{...prevData.player1Data, losses: prevData.player1Data.losses + 1},
                    player2Data: {...prevData.player2Data, wins: prevData.player2Data.wins + 1}
                }));

            }      
            }   
        }

        // If no winner or Draw 
        if(paramTurnArr.every((value) => value !== '')){
            setFinishRound(true);
            setModalIsOpen(true);
            setWinnerText('draw');
            setGameData((prevData)=>({
                ...prevData,
                rounds: prevData.rounds+1,
                player1Data:{...prevData.player1Data, draws: prevData.player1Data.draws + 1},
                player2Data: {...prevData.player2Data, draws: prevData.player2Data.draws + 1}
            }));
        }
        
    }

    const clearBoard = () => {
        if(finishRound){    
            setTurnArray(newBoard);
            setFinishRound(false);
            setCurrentTurn(0);
            setModalIsOpen(false);
            setWinnerText('');
            setTurn('x');
        }
    }

    const handleSelectedBox = async(e,index) => {
        e.preventDefault();
        if(e.target.textContent === ''){
            if(currentTurn % 2 === 0) setTurn('o');
            else setTurn('x');
            
            let newBoxArr = [...turnArr];
            newBoxArr[index] = turn;
            setTurnArray(newBoxArr);
            checkWinner(newBoxArr);
            setCurrentTurn((prev)=>prev+1);
        }
    }
  return (
    <>
    <div className="w-full max-w-[414px] p-2 mt-5 mx-auto">
        {/* <main className="w-full p-4 min-h-screen bg-gradient-to-tr from-[#420292] to-[#BC4CF2]"> */}
        {modalIsOpen? <InGameModal 
        gameData={gameData}
        winnerText={winnerText}
        clearBoard={clearBoard}
        setModalIsOpen={setModalIsOpen}

        /> : null }
        <header className="h-40 flex justify-center items-center gap-2 mt-8 text-white">
            <div className={`relative w-36 flex flex-col justify-center items-center border-solid border-4 ${turn === 'x'? ' border-[#FF9D05]':'border-[#9836D6]'} p-4 bg-gradient-to-tr from-[#9911e7b3] to-[#d106e4b1] rounded-lg shadow-md duration-200`}>
                {turn ==='x'&&
                    <div className="absolute -top-[28px] left-0 w-full font-bold uppercase text-center text-[#FF9D05] bg-gradient-to-t from-[#9911e7b3] to-[#d106e400]">Your Turn</div>
                }
                <h3 className={`text-center text-2xl uppercase font-semibold ${turn === 'x'? ' text-[#FF9D05]':''}`}>{gamePlayers?.player1}</h3>
                <h4 className="text-center uppercase  font-semibold">Wins: {gameData.player1Data.wins}</h4>
                <label className="h-12 w-12 border-2 border-white rounded-lg flex justify-center items-center text-3xl font-extrabold ">
                    <img src={xIcon} className="w-full h-full object-cover rounded-lg shadow-2xl" alt="X Icon" />
                </label>
            </div>

            <div className={`relative w-36 flex flex-col justify-center items-center border-solid  border-4  ${turn === 'o'? ' border-4 border-[#FF9D05]':'border-[#9836D6]'} p-4 bg-gradient-to-tl from-[#9911e7b3] to-[#d106e4b1] rounded-lg shadow-md duration-200`}>
                {turn ==='o'&&
                    <div className="absolute -top-[28px] left-0 w-full font-bold uppercase text-center text-[#FF9D05] bg-gradient-to-t from-[#9911e7b3] to-[#d106e400]">Your Turn</div>
                }
                <h3 className={`text-center text-lg uppercase font-semibold ${turn === 'o'? ' text-[#FF9D05]':''}`}>{gamePlayers?.player2}</h3>
                <h4 className="text-center uppercase  font-bold">Wins: {gameData.player2Data.wins}</h4>
                <label className="h-12 w-12 border-2 border-white rounded-lg flex justify-center items-center text-3xl font-extrabold">
                    <img src={oIcon} className="w-full h-full object-cover rounded-lg shadow-2xl" alt="X Icon" />
                </label>
            </div>
        </header>
        
        <div className="mt-5 mx-auto grid grid-cols-3 justify-center gap-4 w-fit p-5 bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] rounded-lg shadow-xl">
            {
                turnArr.map((_,index) => 
                (
                    <button disabled={finishRound} key={index} className={`w-16 h-16 bg-blue-400 capitalize disabled:bg-slate-500 bg-gradient-to-t from-[#1A1C4F] to-[#1A1C4F] focus:outline-none rounded-lg  shadow-xl duration-1000 overflow-hidden`}
                    onClick={(e)=>handleSelectedBox(e,index)}
                    >{
                        (turnArr[index] === 'x' && <img src={xIcon} className="w-full h-full object-cover rounded-lg shadow-2xl" alt="X Icon" />)
                        || 
                        (turnArr[index] === 'o' && <img src={oIcon} className="w-full h-full object-cover rounded-lg shadow-2xl" alt="O Icon" />)
                    }</button>
                        ))
            }
        </div>
        

        {/*
        <div className="w-full flex justify-center">
            <Link to={'/'} className="bg-[#9A11E7] p-3 rounded-md border-2 border-white">
                    <svg fill="#ffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 495.398 495.398">
                    <g><g><g>
                            <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
                            v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
                            c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
                            c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
                            <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
                            c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
                            c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
                        </g></g></g>
                    </svg>
            </Link>
                
             <Link to={'/'} className="bg-[#9A11E7] p-3 rounded-md border-2 border-white">
                <svg id="Layer_1" fill="#ffff" width="30px" height="30px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.06"><title>back-arrow</title><path d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z"/>
                </svg>
            </Link> 
        </div>
        */}
    </div>

    <div className="mt-5 bg-gradient-to-tl from-[#9911e7b3] to-[#d106e4b1] px-4 py-2 rounded-lg">
    <p className="text-transparent bg-gradient-to-r from-[#FFDC80]  via-[#FE9C05]  to-[#FE9C05] bg-clip-text font-semibold">Round: <span className="font-extrabold text-lg">{gameData.rounds}</span></p>
    </div>
    </>
  )
}

export default MultiPlayerPage;