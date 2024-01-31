import PropTypes from 'prop-types';
import background_mobile from '../assets/tictactoe_background_mobile.jpg';
import background_desktop from '../assets/tictactoe_background_desktop.jpg';
function Layout({ children }) {

  return (
    <main className="relative flex p-4 font-play w-full min-h-screen bg-gradient-to-tr from-[#420292] to-[#BC4CF2]"
     >
      <div className='absolute w-full h-full top-0 left-0 z-20'>
          <img className='block md:hidden w-full h-full object-cover' src={background_mobile} alt="Main background" /> 
          <img className='hidden md:block w-full h-full object-cover' src={background_desktop} alt="Main background" /> 
      </div>
      <div className='z-30 w-full flex flex-col items-center'>
        {children}
      </div>
        
    </main>
  )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Layout