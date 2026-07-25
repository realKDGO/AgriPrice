import BrowserRouter from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * App.jsx — Root component.
 * Add new routes here as the project grows.
 */
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Footer />
        <div>Test</div>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
