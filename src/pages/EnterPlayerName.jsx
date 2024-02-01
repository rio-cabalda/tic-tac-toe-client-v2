
import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';

import gameOn from '../assets/gameOn.gif';
import SoloPlayer from "../components/SoloPlayer";
import MultiPlayer from "../components/MultiPlayer";

function EnterPlayerName() {
  const [gameMode, setGameMode] = useState('multi');
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [soloPlayer, setSoloPlayer] = useState('');
    const [isEmptyField, setIsEmptyField] = useState('');
    const [selectSymbol, setSelectSymbol] = useState('');
    const navigate = useNavigate();
    
    const multiPlayerRef = useRef(null);
    const soloPlayerRef = useRef(null);
    const [selectionHeight, setSelectionHeight] = useState(90);

    useEffect(() => {
      // Access the height using the offsetHeight property
      const multiPlayerHeight = multiPlayerRef.current.offsetHeight;
      const soloPlayerHeight = soloPlayerRef.current.offsetHeight;
      const setHeight = multiPlayerHeight > multiPlayerHeight ? multiPlayerHeight: soloPlayerHeight
      setSelectionHeight(setHeight);
    }, []);



    useEffect(()=>{
      setIsEmptyField('');
      setPlayer1('');
      setPlayer2('');
      setSoloPlayer('');
      setSelectSymbol('');
    },[gameMode])

    const handleSubmit = ()=>{
        setIsEmptyField('');
        const timeoutId = setTimeout(() => {
          if(gameMode === 'multi'){
            if(player1 ==='' && player2 === ''){
              setIsEmptyField('There is empty Field');
            }
            else if(player1.toLocaleLowerCase() === player2.toLocaleLowerCase()){
              setIsEmptyField('Please enter different names.');
            }else{  
              navigate('/multiplayer',{state:{player1,player2}});
            }
          }
          if(gameMode === 'solo'){
            if(soloPlayer !=='' && selectSymbol!==''){
              navigate('/soloplayer',{state:{soloPlayer,selectSymbol}});
            }else{
              setIsEmptyField('You must select symbol and enter your name');
            }
          }
        }, 500);
    
        // Clean up the timeout if needed (cancel the timeout)
        return () => clearTimeout(timeoutId);
        
    }

  return (
    <>
        <div className="w-full max-w-[414px] py-6 p-2 bg-gradient-to-t mt-5 from-[#ffdb80f0] to-[#fe9a05d7] rounded-xl mx-auto shadow-md">
              <img className="my-4 w-32 -translate-x-7 mx-auto" src={gameOn} alt="Game on!" />
              <div>
                <div className="flex border-b-2 border-[#FFDC80]">
                  <button className={`font-semibold rounded-t-lg ${gameMode === 'multi'? 'bg-gradient-to-tr from-[#9A11E7] to-[#D006E4] text-slate-800':'bg-[#fe9a057f] text-slate-600'} px-2 py-1 duration-300`} onClick={()=>setGameMode('multi')}>Multi Player</button>
                  <button className={`font-semibold rounded-t-lg ${gameMode === 'solo'? 'bg-gradient-to-tr from-[#9A11E7] to-[#D006E4] text-slate-800':'bg-[#fe9a057f] text-slate-600'} px-2 py-1 duration-300`} onClick={()=>setGameMode('solo')}>Solo Player</button>
                </div>
                <div className="w-full  mx-auto flex mt-8 justify-center">
                  <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center  ">
                    <div className={`relative w-full `} style={{height:`${selectionHeight}px`}}>

                      <div ref={multiPlayerRef} className={`absolute w-full left-1/2 -translate-x-1/2 top-0 ${gameMode === 'multi'? 'opacity-1 z-20' :'opacity-0 -z-10'} duration-[400ms]`}>
                        <MultiPlayer 
                          player1={player1} 
                          setPlayer1={setPlayer1}
                          player2={player2} 
                          setPlayer2={setPlayer2}
                        />
                      </div>
                      
                      <div ref={soloPlayerRef} className={`absolute w-full left-1/2 -translate-x-1/2 top-0 ${gameMode !== 'multi'? 'opacity-1 z-20' :'opacity-0 -z-10'} duration-[400ms]`}>
                      <SoloPlayer 
                        selectSymbol={selectSymbol} 
                        setSelectSymbol={setSelectSymbol}
                        soloPlayer={soloPlayer} 
                        setSoloPlayer={setSoloPlayer}/> 
                      </div>
                      
                    </div>
                    {/* {gameMode === 'multi'? 
                      <MultiPlayer 
                        player1={player1} 
                        setPlayer1={setPlayer1}
                        player2={player2} 
                        setPlayer2={setPlayer2}
                      />
                    :
                    <SoloPlayer 
                      selectSymbol={selectSymbol} 
                      setSelectSymbol={setSelectSymbol}
                      soloPlayer={soloPlayer} 
                      setSoloPlayer={setSoloPlayer}/> 
                    } */}

                    <div className={`flex justify-center items-center text-center h-10 w-48 mt-1 text-sm leading-none ${isEmptyField? 'opacity-100 text-pink-700 font-bold bg-slate-500/35':'opacity-0'} rounded-md duration-500`}>
                      <p className="">{isEmptyField}</p>
                    </div>
                    <div className="mt-2 bg-[#fdf2e1] shadow-md rounded-3xl ">
                        <button type="button" onClick={handleSubmit} className="transform -translate-y-1 rounded-3xl text-xs mx-auto py-2 px-10 bg-gradient-to-t from-[#9A12E8] to-[#C228E8] active:from-[#a046d4] active:to-[#ce43f0] active:translate-y-0 duration-100">
                            <span className="text-lg font-bold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text capitalize">Start</span>
                        </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex w-full mt-3 bg-red-500 justify-center">
                {/* <Link to={'/'} className="bg-[#9A11E7] p-3 rounded-md border-2 border-white">
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
                    </Link> */}
              </div>
        </div>
    </>
  )
}

export default EnterPlayerName