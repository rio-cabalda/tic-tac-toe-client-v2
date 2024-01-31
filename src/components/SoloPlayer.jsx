import { PropTypes } from "prop-types";
import xIcon from '../assets/x.png';
import oIcon from '../assets/o.png';

function SoloPlayer({selectSymbol,setSelectSymbol, soloPlayer, setSoloPlayer}) {
  return (
    <div className="flex flex-1 justify-center">
        <div className="flex flex-col justify-center items-center p-4 bg-gradient-to-tr from-[#9A11E7] to-[#D006E4] rounded-lg">

        <h3 className="mb-2 font-bold bg-gradient-to-t from-[#FFDC80] to-[#FE9C05] text-transparent bg-clip-text cursor-pointer duration-150" onClick={()=>setSelectSymbol('')}>{selectSymbol? 'Click here to reset symbol': 'Please select your symbol'}</h3>

        <div className="flex justify-around w-full">
            <a htmlFor="player1" className={`h-16 w-16 ${selectSymbol ==='o'? 'invisible':'duration-200'} ${selectSymbol ==='x' && 'translate-x-[93%] duration-200'}  border-2 border-white rounded-lg flex justify-center gap-2 items-center text-5xl font-extrabold bg-gradient-to-bl from-[#A400F4] to-[#5F03A2]`} onClick={()=>setSelectSymbol('x')}>
                <img src={xIcon} className="w-full h-full object-cover rounded-lg shadow-2xl" alt="X Icon" />
            </a>

            <a htmlFor="player2" className={`h-16 w-16 ${selectSymbol ==='x'? 'invisible':'duration-200'} ${selectSymbol ==='o' && '-translate-x-[93%] duration-200 '} border-2 border-white cursor-pointer rounded-lg flex justify-center gap-2 items-center text-5xl font-extrabold bg-gradient-to-bl from-[#A400F4] to-[#5F03A2]`} onClick={()=>setSelectSymbol('o')}>
                <img src={oIcon} className="w-full h-full object-cover rounded-lg shadow-2xl" alt="O Icon" />
            </a>
        </div>

        <input id="SoloPlayer" className="text-[#FF9D05] font-bold text-lg text-center peer h-fit w-full border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#FF9D05] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:font-normal placeholder:text-base placeholder:text-white" type="text" value={soloPlayer} onChange={(e)=>setSoloPlayer(e.target.value)} placeholder="Enter Name" maxLength={9} required/>
        </div>
    </div> 
  )
}
SoloPlayer.propTypes = {
    selectSymbol: PropTypes.string.isRequired,
    setSelectSymbol: PropTypes.func.isRequired, 
    soloPlayer: PropTypes.string.isRequired, 
    setSoloPlayer: PropTypes.func.isRequired
}
export default SoloPlayer