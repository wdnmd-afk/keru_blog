import React from 'react';

// 定义 Home 组件
const Home: React.FC = () => {
    // 点击按钮的处理函数
    const handleClick = () => {
        alert('欢迎来到我的网站！');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>欢迎来到我的主页</h1>
            <p style={styles.description}>
                这是一个使用 React 和 TypeScript 构建的简单示例页面。
            </p>
            <button style={styles.button} onClick={handleClick}>
                点击我
            </button>
        </div>
    );
};

// 样式对象
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        color: '#666',
        margin: '10px 0',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

// 导出 Home 组件
export default Home;
