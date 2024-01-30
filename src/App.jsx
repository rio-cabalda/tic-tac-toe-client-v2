import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MultiPlayerPage from './pages/MultiPlayerPage';
import EnterPlayerName from './pages/EnterPlayerName'
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import SoloPlayerPage from './pages/SoloPlayerPage';

function App() {


  return (
    <Layout >
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/players" element={<EnterPlayerName />}/>
            <Route path="/multiplayer" element={<MultiPlayerPage />}/>
            <Route path="/soloplayer" element={<SoloPlayerPage />}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
