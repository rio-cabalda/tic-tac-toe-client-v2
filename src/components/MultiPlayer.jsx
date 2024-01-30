import { PropTypes } from "prop-types";

const MultiPlayer = ({player1,setPlayer1,player2,setPlayer2}) => {
  return (
    <div className="flex gap-2">
        <div className="flex flex-col justify-center items-center p-4 bg-gradient-to-tr from-[#9A11E7] to-[#D006E4] rounded-lg">
        <label htmlFor="player1" className="h-20 w-20 border-2 border-white rounded-lg flex justify-center items-center text-5xl font-extrabold bg-gradient-to-bl from-[#A400F4] to-[#5F03A2] ">
            <span className="text-transparent bg-gradient-to-t from-[#EE090C] to-[#FF6365] bg-clip-text -translate-y-1">x</span>
        </label>
        <input id="player1" className="text-[#FF9D05] font-bold text-lg text-center peer h-fit w-full border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#FF9D05] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:font-normal placeholder:text-base placeholder:text-white" type="text" value={player1} onChange={(e)=>setPlayer1(e.target.value)} placeholder="Enter Name" maxLength={9} required/>
        </div>
        <div className="flex flex-col justify-center items-center p-4 bg-gradient-to-tl from-[#9A11E7] to-[#D006E4] rounded-lg">
        <label htmlFor="player2"  className="h-20 w-20  border-2 border-white rounded-lg flex justify-center items-center text-5xl font-extrabold bg-gradient-to-bl from-[#A400F4] to-[#5F03A2]">
            <span className="text-transparent bg-gradient-to-t from-[#FF9D05] to-[#FBE49C] bg-clip-text -translate-y-1">o</span>
        </label>
        <input id="player2" className="text-[#FF9D05] font-bold text-lg text-center peer h-fit w-full border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#FF9D05] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:font-normal placeholder:text-base placeholder:text-white" type="text" value={player2} onChange={(e)=>setPlayer2(e.target.value)} placeholder="Enter Name" maxLength={9} required/>
        </div>
    </div>
  )
}
MultiPlayer.propTypes = {
    player1: PropTypes.string.isRequired,
    setPlayer1: PropTypes.func.isRequired, 
    player2: PropTypes.string.isRequired, 
    setPlayer2: PropTypes.func.isRequired
}
export default MultiPlayer