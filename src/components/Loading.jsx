

function Loading(text) {
return (
    <div className={`relative w-full h-full transform origin-center`}>
        <div className="absolute font-play z-30 right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
            <div className="p-4 bg-transparent rounded-full ">
                <div className=" bg-gradient-to-tr from-[#420292] to-[#BC4CF2] rounded-full ">
                    <div className="w-24 h-24 flex justify-center items-center rounded-full font-semibold text-[#FE9C05] capitalize">{text.text}</div>
                </div>
            </div>
        </div>
        <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 radialLoading p-10">
            <div className="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full ">
                <div className="bg-gradient-to-tr from-[#420292] to-[#BC4CF2] rounded-full ">
                    <div className="w-24 h-24 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Loading