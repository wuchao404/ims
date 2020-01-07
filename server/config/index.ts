
// 是否是dev环境
export const dev: boolean = process.env.NODE_ENV === 'development';
// mysql链接地址
export const mysqlHost: string = dev ? '123.206.72.106' : 'localhost';
// 用户名
export const mysqlUser: string = dev ? 'admin' : 'root';
// 密码
export const mysqlPwd: string = dev ? '123456' : 'w53476157';
// 数据库名
export const mysqlDb: string = 'management';
// jwt加密串
export const jwtSecret: string = 'AAAAB3NzaC1yc2EAAAADAQABAAABAQDPhjXUwmOPZHavMNs2OJPNW4sMJiL/LfpiN5NLPGFVNcse7TeMk2NJRkE2/cpaiVtRB9jyNd27im4SznDNnTmcskmHeslP6Wz/VCG1UkyfGK/s5QUUbqhw92i+UYgB5xjlJGWGK3OKZ+mXdjDH1jXSgNqB8XhyZTxsftUkwXuF6SDBx5vU6GCjmatxP6gt4wqCyRpKg2oMjseHQmnCL1vKOm7uUC+T2nJGGjIJ+66rjhre7wGTgjtjCgmhPaRMPwiu0svmDLzMo3PEryKBYFeC4mPer22ZeRgvqr5kJfJ06yP5L4TlpHsgspaYkko4FzO+0kJ1SQtBnVwRIlo2sCFV';