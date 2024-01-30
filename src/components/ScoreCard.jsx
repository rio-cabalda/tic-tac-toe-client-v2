import winner2 from '../assets/winner2.png';
function ScoreCard(playersData) {
  return (
    <div className="text-slate-900 w-full p-2 px-4 flex flex-col rounded-xl shadow-md bg-gradient-to-tl from-[#ebc7a8] to-[#FB963B]">
                    {/* Row */}
                    <div className="self-start transform -skew-x-12 bg-gradient-to-t from-[#FD615C] to-[#fa1010]   rounded-br-lg rounded-tl-lg shadow-lg px-4 py-1">
                        <div className="transform skew-x-12 font-semibold text-xs">
                            Wins: {playersData.player1Data.wins} Losses: {playersData.player1Data.losses} Draws: {playersData.player1Data.draws}
                        </div>
                    </div>
                    <div className="w-full flex justify-between uppercase">
                        <div className="relative h-fit text-center transform -skew-x-12 -translate-x-[4.5px] w-[8rem] px-4 pb-1 leading-none font-semibold bg-[#FD615C] rounded-br-3xl">
                            {playersData.player1Data.name}
                            {playersData.player1Data.wins > playersData.player2Data.wins &&
                                <img className="absolute top-0 left-2 w-8 transform skew-x-12" src={winner2} alt="Player 1 is the winner" />
                            }
                        </div>
                        <h2 className="font-extrabold text-slate-100 text-xl">VS</h2>
                        <div className="relative h-fit self-end flex items-end justify-center -skew-x-12 translate-x-[4.5px] w-[8rem] px-4 pt-1 pb-1 leading-none font-semibold bg-[#FE9C05] rounded-tl-3xl">
                            {playersData.player2Data.name}
                            {playersData.player1Data.wins < playersData.player2Data.wins &&
                            <img className="absolute -top-3 right-2 w-8 transform skew-x-12" src={winner2} alt="Player 1 is the winner" />
                            }
                        </div>
                    </div>
                    <div className="self-end transform -skew-x-12 bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] rounded-br-lg rounded-tl-lg shadow-lg px-4 py-1">
                        <div className="transform skew-x-12 font-semibold text-xs">
                        Wins: {playersData.player2Data.wins} Losses: {playersData.player2Data.losses} Draws: {playersData.player2Data.draws}
                        </div>
                    </div>
                </div>
  )
}

export default ScoreCard