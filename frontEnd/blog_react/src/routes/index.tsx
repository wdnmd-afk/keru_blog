// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/systemPages/home';
import AllViews from '../views';

const AppRoutes: React.FC = () => {
    console.log(AllViews, 'vvvv');
    let routeList:any[] = [];
    for (const key in AllViews) {
        //循环生成路由使用的element，不能直接使用函数
        routeList.push({ path: key.toLowerCase(), element: React.createElement(AllViews[key as keyof typeof AllViews] as React.FC) });
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {routeList.map(item => (
                    <Route path={item.path} element={item.element} key={item.path} />
                ))}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
