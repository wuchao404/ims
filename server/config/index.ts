
// 是否是dev环境
export const dev: boolean = process.env.NODE_ENV === 'development';
// mysql链接地址
export const mysqlHost: string = dev ? '123.206.72.106' : 'localhost'