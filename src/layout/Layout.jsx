import PropTypes from 'prop-types';
import backgroundImage from '../assets/tictactoe_background.jpg';
function Layout({ children }) {

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <main className="relative flex flex-col items-center p-4 font-play w-full min-h-screen bg-gradient-to-tr from-[#420292] to-[#BC4CF2]"
    >
      <img className='absolute top-0 left-0 w-full h-full z-20' src={backgroundImage} style={backgroundStyles} alt="Main background" />
      <div className='z-30'>
        {children}
      </div>
        
    </main>
  )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Layout