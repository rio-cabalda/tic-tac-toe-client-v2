
import { useEffect, useRef, useState } from "react"
import { useNavigate} from 'react-router-dom';
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
            if(player1 !=='' && player2 !== ''){
              navigate('/multiplayer',{state:{player1,player2}});
            }else{
              setIsEmptyField('There is empty Field');
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
        <div className="w-full max-w-[414px] py-6 p-2 bg-gradient-to-t mt-5 from-[#FFDC80] to-[#FE9C05] rounded-xl mx-auto">
           
              <img className="my-4 w-32 -translate-x-7 mx-auto" src={gameOn} alt="Game on!" />

              <div>
                <div className="flex border-b-2 border-[#FFDC80]">
                  <button className={`font-semibold rounded-t-lg ${gameMode === 'multi'? 'bg-gradient-to-tr from-[#9A11E7] to-[#D006E4]':'bg-[#FE9C05]'} px-2 py-1 duration-300`} onClick={()=>setGameMode('multi')}>Multi Player</button>
                  <button className={`font-semibold rounded-t-lg ${gameMode === 'solo'? 'bg-gradient-to-tr from-[#9A11E7] to-[#D006E4]':'bg-[#FE9C05]'} px-2 py-1 duration-300`} onClick={()=>setGameMode('solo')}>Solo Player</button>
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

                    <div className={`flex justify-center items-center text-center h-10 w-48 mt-1 text-sm leading-none ${isEmptyField? 'opacity-100 text-red-600 bg-slate-500/35':'opacity-0'} rounded-md duration-500`}>
                      <p className="">{isEmptyField}</p>
                    </div>
                    <div className="mt-2 bg-[#fdf2e1] shadow-md rounded-3xl ">
                        <button type="button" onClick={handleSubmit} className="transform -translate-y-1 rounded-3xl text-xs mx-auto py-1 px-10 bg-gradient-to-t from-[#9A12E8] to-[#C228E8] active:from-[#a046d4] active:to-[#ce43f0] active:translate-y-0 duration-100">
                            <span className="text-lg font-bold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text capitalize">Start</span>
                        </button>
                    </div>
                  </form>
                </div>
              </div>
        </div>
    </>
  )
}

export default EnterPlayerName