import React from 'react';
import HomeHeader from './components/Header';
import TodoList from './components/TodoList';
import HomeContent from './components/Content';
import style from '@/styles/home.module.scss';

const Home = () => {
    return (
        <div className={style.home_container}>
            <div className={style.home_main}>
                <HomeHeader />
                <TodoList />
                <HomeContent />
            </div>
        </div>
    );
};

export default Home;
