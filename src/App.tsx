import {Routes, Route} from 'react-router-dom';
import { Community } from './pages/Community';
import { HomePage } from './pages/Home';
import './sass/main.sass'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/community' element={<Community />} />
    </Routes>
  );
}

export default App;
