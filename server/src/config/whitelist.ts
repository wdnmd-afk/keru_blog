 const openPaths = ['/login', '/register', '/static/*', '/health', '/user/resetPassword'];

const isWhiteListPath = (path: string) => { 
    // 检查是否为公开路径
        const isOpenPath = openPaths.some(item => {
            if (path.endsWith('*')) {
                return path.startsWith(item.slice(0, -1));
            }
            return path.includes(path);
        });

        return isOpenPath;
};

export {isWhiteListPath,openPaths}