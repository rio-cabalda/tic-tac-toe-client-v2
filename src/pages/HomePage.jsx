import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreCard from "../components/ScoreCard";
import Loading from "../components/Loading";
import capooGaming from '../assets/capooGaming.gif';

function HomePage() {
    const [scoreBoard, setScoreBoard] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const BASE_URL = 'https://witty-calf-button.cyclic.app';

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/api/players`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                const sortedResult = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setScoreBoard(sortedResult);
                
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
            const timeoutId = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            return () => clearTimeout(timeoutId);
        };
    
        fetchData();
        
    },[]);
    const handleStart = () =>{
        const timeoutId = setTimeout(() => {
            navigate('/players');
        }, 300);
        return () => clearTimeout(timeoutId);  
    }

    return (
    <>
        {isLoading? 
        <div className="relative w-full h-[70vh] text-center">
            <Loading text={'Fetching Game Data'}/>
        </div>
        :<>
        <section className="px-4 max-w-[414px]">
            <div className=" font-bold flex flex-col items-center text-white radialTitle p-10">
                {/* <h1 className="text-center">SCOREBOARD</h1> */}
                <h3 className="text-[3rem] leading-[0.6] text-[#fdf2e1] text-shadow shadow-[#FF9D05]">TIC</h3>
                <h3 className="text-[3rem] leading-none text-[#fdf2e1] text-shadow shadow-[#FF9D05]">TAC</h3>
                <h1 className="transform translate-x-[1rem] -translate-y-7 text-[5rem] leading-none tracking-[2rem] text-center bg-gradient-to-t from-[#eccf86] to-[#ff9900] text-transparent bg-clip-text">ToE</h1>
            </div>

            {/* Data from database */}
            {error ? 
                 <div  className="-mt-10 p-2 pr-1 rounded-xl shadow-md bg-[#9811e69b] "> 
                    <div className="flex flex-col gap-3 rounded-xl max-h-96 overflow-y-scroll overflow-hidden">
                        <div className="w-full h-[40vh] p-2 px-4 flex flex-col rounded-xl shadow-md bg-gradient-to-tl from-[#ebc7a8] to-[#FB963B]">
                                <h5 className="text-center font-semibold text-white">Something went wrong</h5>
                            </div>
                    </div>
                </div>
            :
            scoreBoard.length < 1? 
                <div  className="-mt-10 p-2 pr-1 rounded-xl shadow-md bg-[#9811e69b] "> 
                    <div className="flex flex-col gap-3 rounded-xl max-h-96 overflow-y-scroll overflow-hidden">
                        <div className="w-full py-6 px-4 flex flex-col gap-5 items-center rounded-xl shadow-md bg-gradient-to-tl from-[#F98828] to-[#FB963B]">
                            <h5 className="text-center font-semibold text-[#FEFEFF] leading-none">Looks like no one has played yet. Get in the game and make your mark!</h5>
                            <img className="w-20" src={capooGaming} alt="Capoo Gaming" />
                        </div>
                    </div>
                </div>
                :
                <div  className="-mt-10 p-2 pr-1 rounded-xl shadow-md bg-[#9811e69b] "> 
                    <div className="flex flex-col gap-3 rounded-xl max-h-[50vh] overflow-y-scroll overflow-hidden px-1">
                    {scoreBoard.map((playersData,index)=>(<ScoreCard key={playersData._id?playersData._id:index} {...playersData} />))     
                     }
                    </div>
                </div>

            // <div  className="-mt-10 p-2 pr-1 rounded-xl shadow-md bg-[#9811e69b] "> 
            //     <div className="flex flex-col gap-3 rounded-xl max-h-96 overflow-y-scroll overflow-hidden pr-1">
            //         {/* Body */}
            //         {error? 
                    
            //         :
            //             scoreBoard.length < 1? <div className="w-full p-2 px-4 flex flex-col items-center rounded-xl shadow-md bg-gradient-to-tl from-[#F98828] to-[#FB963B]">
            //                 <h5 className="text-center font-semibold text-[#FEFEFF] leading-none">Looks like no one has played yet. Get in the game and make your mark!</h5>
            //                 <img className="w-20" src={capooGaming} alt="Capoo Gaming" />

            //                 </div> 
            //                 :
            //                 scoreBoard.map((playersData,index)=>(<ScoreCard key={playersData._id?playersData._id:index} {...playersData} />))     
            //         }
            //     </div>
            // </div>
            }
        </section>

        <div className="flex justify-center mt-5 mb-2">
            {/* Button wrapper */}
            <div className="bg-[#fdf2e1] shadow-md rounded-3xl ">
                <button type="button" onClick={handleStart} className="transform -translate-y-1 rounded-3xl text-xs mx-auto py-2 px-4 bg-gradient-to-t from-[#9A12E8] to-[#C228E8] active:from-[#a046d4] active:to-[#ce43f0] active:translate-y-0 duration-100">
                    <span className="text-lg font-bold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text">Start New Game</span>
                </button>
            </div>
        </div>
        </>}
    </>
    )}

export default HomePage