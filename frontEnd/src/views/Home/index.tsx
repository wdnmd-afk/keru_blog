import style from '@/styles/home.module.scss'
import HomeContent from './components/Content'
import HomeHeader from './components/Header'
import TodoList from './components/TodoList'

const Home = () => {
    return (
        <div className={style.home_container}>
            <div className={style.home_main}>
                <HomeHeader />
                <TodoList />
                <HomeContent />
            </div>
        </div>
    )
}

export default Home
