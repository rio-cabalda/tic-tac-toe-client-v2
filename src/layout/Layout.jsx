import PropTypes from 'prop-types';
function Layout({ children }) {
  return (
    <main className="flex flex-col items-center p-4 font-play w-full min-h-screen bg-gradient-to-tr from-[#420292] to-[#BC4CF2]">
        {children}
    </main>
  )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Layout