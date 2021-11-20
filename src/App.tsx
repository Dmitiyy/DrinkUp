import {Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/Home';
import './sass/main.sass'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}

export default App;
