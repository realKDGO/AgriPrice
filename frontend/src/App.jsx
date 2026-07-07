import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

/**
 * App.jsx — Root component.
 * Add new routes here as the project grows.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wraps all public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* TODO: Add more routes (e.g. /prices, /about) */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
