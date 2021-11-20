import {Routes, Route} from 'react-router-dom';
import { CocktailElement } from './pages/CocktailElement';
import { Community } from './pages/Community';
import { HomePage } from './pages/Home';
import './sass/main.sass';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/community' element={<Community />} />
      <Route path='/cocktails' element={<HomePage />} />
      <Route path='/cocktails/search' element={<CocktailElement community={false} />} />
      <Route path='/community/search' element={<CocktailElement community={true} />} />
    </Routes>
  );
}

export default App;
