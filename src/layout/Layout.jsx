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
      style={backgroundStyles}
    >
        {children}
    </main>
  )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Layout