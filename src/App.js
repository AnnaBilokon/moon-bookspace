import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookContextProvider from './store/book-context.jsx'
import SearchPage from './pages/SearchPage.jsx';

function App() {
  return (
		<div className="App">

		<Router>
		<Routes>
		  <Route path='/' element={<Home/>}/>
		  <Route path='/search' element={<BookContextProvider> <SearchPage/> </BookContextProvider>}/>
		</Routes>
		</Router>

    </div>

    
  );
}

export default App;
