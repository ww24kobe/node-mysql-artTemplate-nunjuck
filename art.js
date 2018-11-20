const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const template = require('art-template');
const express_template = require('express-art-template');

//指定静态资源文件的路径
app.use("/public", express.static(__dirname + '/public'));
//设置模板路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');
//注册过滤器
template.defaults.imports.title = function (value) {
  return value + 1000
};

app.get('/detail', function (req, res) {
  res.render('demo.html', {
    name: '大锤',
    users: ['如花', '八戒', '孙悟空', '孙楠']
  });
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});