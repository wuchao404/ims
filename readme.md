# 1.引入antd
1.1 载依赖
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

# 4.[使用Knex.js进行Mysql的ORM操作，快速执行sql](http://knexjs.org/#Installation)
- 1.[kenx基础语法](http://knexjs.org/#Builder-identifier-syntax)
- 2.
