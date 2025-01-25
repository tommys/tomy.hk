// src/App.js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './config/routesConfig';


const LazyLoadedComponent = lazy(() => import('./components/LazyLoadedComponent'));

const App = () => {

return (
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/lazy" element={<LazyLoadedComponent />} />
            {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
            ))}
        </Routes>
        </Suspense>
    </Router>
    );
};

export default App;
