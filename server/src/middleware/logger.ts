import log4js from 'log4js';

// 配置 log4js
log4js.configure({
    appenders: {
        out: {
            type: 'stdout', // 输出到控制台
            layout: {
                type: 'colored' // 使用带颜色的布局
            }
        },
        file: {
            type: 'file', // 输出到文件
            filename: './logs/server.log', // 指定日志文件路径和名称
        }
    },
    categories: {
        default: {
            appenders: ['out', 'file'], // 使用 out 和 file 输出器
            level: 'debug' // 设置日志级别为 debug
        }
    }
});

// 获取 logger
const logger = log4js.getLogger('default');

// 日志中间件
const loggerMiddleware = (req, res, next) => {
    logger.debug(`${req.method} ${req.url}`,req.body); // 记录请求方法和URL
    next();
};

export default loggerMiddleware;
