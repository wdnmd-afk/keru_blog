import React from 'react'
import { Card } from 'antd'
import style from '@/styles/home.module.scss'
import bookImage from '@/assets/images/book.png'
import technologyImage from '@/assets/images/technology.png'
import lyfImage from '@/assets/images/lyf.png'
import lyf2Image from '@/assets/images/bg.png'

const { Meta } = Card
// 将 CounterProvider 包裹在 Home 组件的外部
const Home = () => {
    return (
        <div className={style.home_container}>
            <div className={style.home_main}>
                <h1 className={style.home_title}>React & Node Study</h1>
                <div className={style.home_card_box}>
                    <Card
                        hoverable
                        style={{ height: 300 }}
                        cover={<img alt='books' src={bookImage} style={{ height: 200 }} />}
                    >
                        <Meta title='Books' description='We can read many technology-related books here.' />
                    </Card>

                    <Card hoverable style={{ height: 300 }} cover={<img alt='technology' src={technologyImage} />}>
                        <Meta title='Technology' description='We can learn a lot of new technologies here.' />
                    </Card>

                    <Card hoverable cover={<img alt='example' src={lyfImage} />}>
                        <Meta title='Yifei Liu' description="We can admire Liu Yifei's beauty here" />
                    </Card>
                    <Card hoverable cover={<img alt='example' src={lyf2Image} />}>
                        <Meta title='Yifei Liu' description="We can admire Liu Yifei's beauty here" />
                    </Card>
                </div>
            </div>
        </div>
    )
}

// 导出 App 组件
export default Home
