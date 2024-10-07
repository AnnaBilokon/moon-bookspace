import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookContextProvider from './store/book-context.jsx'
import SearchPage from './pages/SearchPage.jsx';
import StartPage from './pages/StartPage.jsx';

function App() {
  return (
		<div className="App">

		<Router>
		<Routes>
		  <Route path='/' element={<StartPage/>}/>
		  <Route path='/home' element={<Home/>}/>
		  <Route path='/search' element={<BookContextProvider> <SearchPage/> </BookContextProvider>}/>
		</Routes>
		</Router>

    </div>

    
  );
}

export default App;
