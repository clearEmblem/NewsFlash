import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import NewsLayout from './layouts/NewsLayout';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Grouped layout for all news pages */}
      <Route path="/news" element={<NewsLayout />}>
        {/* Default to /news/General when just /news is visited */}
        <Route index element={<Navigate to="General" replace />} />
        <Route path=":category" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
