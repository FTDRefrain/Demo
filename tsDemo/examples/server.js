const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddlewware = require('webpack-dev-middleware');
const webpackHotMiddlewware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(webpackDevMiddlewware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddlewware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

registerSimpleRouter();
registerBaseRouter();
registerErrorRouter();
registerExtendRouter();
registerInterceptorRouter();
registerConfigRouter();
registerCancelRouter();

app.use(router);

const port = process.env.PORT || 8080
  ;
module.exports = app.listen(port, () => {
  console.log(`server listen ${port}`);
});

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: `hello world`
    });
  });
  router.post('/simple/post', function (req, res) {
    res.json(req.body);
  });
  
  router.post('/simple/buffer', function (req, res) {
    // buffer流操作
    let msg = [];
    req.on('data', chunk => {
      if(chunk) {msg.push(chunk);}
    });
    req.on('end', () => {
      let buf = Buffer.concat(msg);
      res.json(buf.toJSON());
    });
  });
}

function registerBaseRouter(){
  router.get('/base/get', function (req, res) {
    res.json(req.query);
  });
}

function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if(Math.random() > 0.5) {
      res.json({msg: 'hello world'});
    } else {
      res.status(500);
      res.end();
    }
  });
  
  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({msg: 'hello'});
    }, 3000);
  });
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res){
    res.end();
  });
  router.delete('/extend/delete', function(req, res){
    res.end();
  });
  router.options('/extend/options', function(req, res){
    res.end();
  });
  router.head('/extend/head', function(req, res){
    res.end();
  });
  router.post('/extend/post', function(req, res){
    res.json(req.body);
  });
  router.put('/extend/put', function(req, res){
    res.json(req.body);
  });
  router.patch('/extend/patch', function(req, res){
    res.json(req.body);
  });
  router.get('/extend/user', function(req, res){
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    });
  });
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res){
    res.end('hello');
  });
}

function registerConfigRouter(){
  router.post('/config/post', function(req, res){
    return res.json(req.body);
  });
}

function registerCancelRouter(){
  router.get('/cancel/get', function(req, res){
    setTimeout(()=>{
      res.json('hello');
    }, 1000);
  });
  router.post('/cancel/post', function(req, res){
    setTimeout(()=>{
      res.json(req.body);
    }, 1000);
  });
}