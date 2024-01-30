import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            navigate('/')
        }, 4000);

        // Clean up the timeout on component unmount or on next render
        return () => clearTimeout(timeoutId);
    },[])
  return (
    <div className='self-start max-w-[414px] h-full flex flex-col mt-8 text-[#FE9C05] text-xl font-bold leading-none'><span className="text-5xl font-extrabold self-start">Oops!</span><br /> The page you&apos;re looking for doesn&apos;t exist</div>
  )
}

export default ErrorPage