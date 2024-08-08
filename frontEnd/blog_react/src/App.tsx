import './App.css'
import AppRoutes from './routes/index.tsx'
import React from 'react';
// import 'virtual:svg-icons-register';

const App: React.FC = () => {
    return (
       <div>
           <AppRoutes></AppRoutes>
       </div>
    );
};

export default App
