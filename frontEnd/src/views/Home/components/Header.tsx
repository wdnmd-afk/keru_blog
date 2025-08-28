import React from 'react';
import { Avatar, Statistic } from 'antd';
import logoImage from '@/assets/images/k.jpg';
import style from '@/styles/home.module.scss';

const HomeHeader = () => {
    return (
        <div className={style.home_header}>
            <div className={style.header_content}>
                <Avatar size={80} src={logoImage} className={style.header_avatar} />
                <div className={style.header_info}>
                    <h1 className={style.home_title}>K's Tech Space</h1>
                    <p className={style.home_subtitle}>
                        Share Technical Insights · Document Learning Journey · Explore
                        Infinite Possibilities
                    </p>
                    <div className={style.stats}>
                        <Statistic title="文章" value={24} />
                        <Statistic title="访问" value={12580} />
                        <Statistic title="点赞" value={1024} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
