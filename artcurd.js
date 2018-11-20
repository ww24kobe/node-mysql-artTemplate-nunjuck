const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const template = require('art-template');
const express_template = require('express-art-template');
const mysql = require('mysql'); 
const bodyParser = require('body-parser');
const dbconfig = require('./dbconfig.js');

//指定静态资源文件的路径
app.use("/public", express.static(__dirname + '/public'));

//连接数据库配置
var connection = mysql.createConnection(dbconfig);
//连接mysql
connection.connect();

// 创建 application/x-www-form-urlencoded 编码解析
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }))
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

app.get("/",function(req,res){
  res.redirect('/index');
});

//定义路由
app.get('/index', function (req, res) {
  //查询数据
  connection.query('select * from article',function(err,rows,fields){
      if(err){
          res.send(err);
      }
      //获取数据
      var data = {
          'rows':rows,
          'title':'列表页'
      }
      res.render( 'index.html', data ) ; 
  });
});

app.get('/detail', function (req, res) {
  //查询数据
  var artilce_id = req.query.id;
  connection.query('select * from article where id='+artilce_id+' limit 1 ',function(err,row,fields){
      //获取数据
      var data = {
          'row':row,
          'name':'详情页'
      }
      return res.render( 'detail.html', data ) ;
  });
}); 

app.get('/upd', function (req, res) {
  //查询数据
  var artilce_id = req.query.id;
  connection.query('select * from article where id='+artilce_id+' limit 1 ',function(err,row,fields){
      //获取数据
      var data = {
          'row':row
      }
      res.render( 'upd.html', data ) ;
  });
}); 

app.get('/del', function (req, res) {
  //删除数据
  var artilce_id = req.query.id;
  connection.query('delete from article where id='+artilce_id,function(err,result){
      //获取数据
      if(result.affectedRows > 0){
          res.redirect("/index");
      }else{
          console.log('Delete Fail!');
      }
  });
}); 

app.get('/add', function (req, res) {
  res.render( 'add.html' ) ;
}); 

app.post('/add', function (req, res) {
  var  addSql = 'INSERT INTO article(id,title,content) VALUES(0,?,?)';
  var  addSqlParams = [req.body.title, req.body.content];
  connection.query(addSql,addSqlParams,function(err,result){
      if(err){ 
          console.log("insert Error");
          return ;
      }else{
          res.redirect('/');
      }
  });
}); 


app.post('/upd', function (req, res) {
  var  saveSql = 'update  article set title = ?,content = ? where id = ? ';
  var  saveSqlParams = [req.body.title, req.body.content,req.body.id,];
  connection.query(saveSql,saveSqlParams,function(err,result){
      if(err){ 
          console.log("Update Error");
          return ;
      }else{
          res.redirect('/');
      }
  });
}); 


app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});