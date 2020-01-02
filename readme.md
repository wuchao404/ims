# 1.next.js初始配置
1.1 引入antd
```
yarn add --dev @zeit/next-less babel-plugin-import less less-vars-to-js null-loader
yarn add antd
```
1.2 配置next.config.js和`.babelrc`文件
> 直接将`next.js/examples/with-ant-design-less`两个文件夹拖拽过来

# 2.重写_app.js
[详情查看](https://nextjs.org/docs#custom-app)

# 3.[使用body-parser解析post请求参数](http://www.expressjs.com.cn/4x/api.html#req.body)
```JavaScript
var app = require('express')();
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
```

# 4.1[使用Knex.js进行Mysql的ORM操作，快速执行sql](http://knexjs.org/#Installation)
- 1.[kenx基础语法](http://knexjs.org/#Builder-identifier-syntax)
- 2.[knex调试模式，自动打印sql语句](http://knexjs.org/#Installation-debug)
- 3.[使用column给表字段起别名，将下划线的命名形式改为驼峰式](http://knexjs.org/#Builder-column)

# 4.2 [使用纯ORM框架sequelize替代Knex框架]](https://sequelize.org/v5/)
- 1.[构造函数参数详解](https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)
- 2.

# 5.redis使用
- 1.[安装redis，并在命令行中测试](https://redis.io/download)
- 2.[redis配置远程登录+密码登录](https://blog.csdn.net/weixin_38628533/article/details/81074895)
- 3.[redis安装和自动启动](https://www.cnblogs.com/zuidongfeng/p/8032505.html)

# 6.jwt-token使用
- 1.[jsonwebtoken官方地址](https://github.com/auth0/node-jsonwebtoken)
- 2.过期时间`expiresIn`有两种类型，number(单位是秒)和string)[string类型使用`@zeit/ms`表示](https://github.com/zeit/ms)


# 7.next.js使用
- 1. [拦截popstate，监听浏览器的前进后退按钮](https://nextjs.org/docs#intercepting-popstate)
- 2. [监听router变化，过滤白名单](https://nextjs.org/docs#router-events)
> 所有监听方法，首次刷新页面是不执行的，因此无法
- 3.[使用`/// <reference path`引用node_modules中的其他`d.ts`声明文件](https://www.jianshu.com/p/c143e7af7c04)