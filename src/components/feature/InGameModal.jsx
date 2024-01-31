import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import winner1 from '../../assets/winner1.png';

const InGameModal = ({winnerText,clearBoard,setModalIsOpen,gameData}) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [count, setCount] = useState(5);
    const [intervalId, setIntervalId] = useState(null);

    const navigate = useNavigate();
    const handleContinue = () =>{
        clearBoard();
        setModalIsOpen(false);
    }

    const handlePreview = ()=>{

        setPreview(true);
        const id = setInterval(() => {
                setCount((prev)=>prev-1);
            }, 1000);
        setIntervalId(id);
    }

    if(count < 1) {
        clearInterval(intervalId);4
        setCount(5);
        setPreview(false);
        
    }

    useEffect(()=>{
        if(error){
            navigate('/unknownPage');
        }
    },[error,navigate])
    const hadleSaveData = async() =>{
        setIsLoading(true);
        const BASE_URL = 'https://tic-tac-toe-rio.onrender.com';
        try {
            const response = await fetch(`${BASE_URL}/api/newrecord`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                // Convert the data to JSON format
                body: JSON.stringify(gameData), 
                })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            await response.json();
            // navigate('/');
        } catch (error) {
            setError(error.message);
        }
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 2000);

        // Clean up the timeout on component unmount or on next render
        return () => clearTimeout(timeoutId);
    }

    

    return (
        <div className={`absolute inset-0 z-50 w-full h-screen  ${preview?'backdrop-blur-[1px]':'backdrop-blur-sm'} duration-300 text-white`}>
            {preview? 
            <div className="w-fit mx-auto mt-10">
                <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#FFDC80]  via-[#FE9C05]  to-[#FE9C05] bg-clip-text">{count}</h2>
            </div>
            :
            <div className="relative bg-gradient-to-t from-[#6504A9] to-[#A001E5] rounded-xl mx-auto gap p-2 w-fit translate-y-1/2 ">
                <button className="absolute top-2 right-0 text-white bg-gradient-to-r from-[#FFDC80]  via-[#FE9C05]  to-[#FE9C05] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>handlePreview()}>
                    Preview
                </button>
                <div className="w-full h-60 flex items-center">
                    {isLoading? <Loading text={'saving...'}/>
                    :<div className="w-full h-full flex flex-col justify-center items-center">
                        <img className="h-32 object-cover" src={winner1} alt="Winner Player" />
                    <h1 className="text-5xl font-extrabold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text uppercase">{winnerText==='draw'? `${winnerText}` : 'Winner'}</h1>
                    <h2 className="text-2xl font-extrabold uppercase">{winnerText==='draw'? '': `${winnerText}`}</h2>
                    
                    </div> 
                    }
                </div>
                    {/* loading... */}
                
                <div className="flex gap-5 h-14 min-w-72 justify-center">
                    {isLoading? null: <>
                    <div className="h-fit mt-3 bg-[#fdf2e1] shadow-md rounded-3xl ">
                        <button type="button" onClick={handleContinue} className="transform -translate-y-1 rounded-3xl text-xs mx-auto py-1 px-5 bg-gradient-to-t from-[#9A12E8] to-[#C228E8] active:from-[#a046d4] active:to-[#ce43f0] active:translate-y-0 duration-100">
                            <span className="text-lg font-bold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text capitalize">Continue</span>
                        </button>
                    </div>

                    <div className="mt-3 h-fit bg-[#fdf2e1] shadow-md rounded-3xl ">
                        <button type="button" onClick={hadleSaveData} className="transform -translate-y-1 rounded-3xl text-xs mx-auto py-1 px-10 bg-gradient-to-t from-[#e64242] to-[#f25f61] active:from-[#e74848] active:to-[#db5658] active:translate-y-0 duration-100">
                            <span className="text-lg font-bold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text capitalize">Stop</span>
                        </button>
                    </div>
                    </>}        
                </div>
            </div>
            }
        </div>
    )
}

InGameModal.propTypes={
    winnerText: PropTypes.string.isRequired,
    clearBoard: PropTypes.func.isRequired,
    setModalIsOpen: PropTypes.func.isRequired,
    gameData: PropTypes.shape({
        rounds: PropTypes.number.isRequired,
        player1Data: PropTypes.shape({
            name: PropTypes.string,
            wins: PropTypes.number,
            losses: PropTypes.number,
            draws: PropTypes.number
        }),
        player2Data: PropTypes.shape({
            name: PropTypes.string,
            wins: PropTypes.number,
            losses: PropTypes.number,
            draws: PropTypes.number
        }),
    }),
    
}
export default InGameModal