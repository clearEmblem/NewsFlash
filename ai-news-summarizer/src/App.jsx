
// src/App.jsx
// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import CategoryPage from "./pages/CategoryPage";
import "./index.css";

function App() {
  return (
    // Remove the BrowserRouter wrapper
    <Routes>
      {/* Home route - redirects to CategoryPage with "general" as default */}
      <Route path="/" element={<CategoryPage key="home-general" />} />
      
      {/* Category routes */}
      <Route path="/general" element={<CategoryPage />} />
      <Route path="/technology" element={<CategoryPage />} />
      <Route path="/sports" element={<CategoryPage />} />
      <Route path="/entertainment" element={<CategoryPage />} />
      
      {/* Catch-all for other categories */}
      <Route path="/:category" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;


/*
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import NewsLayout from './layouts/NewsLayout';
import CategoryPage from './pages/CategoryPage';
*/

/*
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
*/

 //     {/* Grouped layout for all news pages */}
 //     <Route path="/news" element={<NewsLayout />}>
 //       {/* Default to /news/General when just /news is visited */}
 //       <Route index element={<Navigate to="General" replace />} />
 //       <Route path=":category" element={<CategoryPage />} />
 //     </Route>
 //   </Routes>
//  );
//}


//export default App;

// src/App.jsx
