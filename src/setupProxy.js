  
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://quickmart.herokuapp.com/',
      changeOrigin: true,
    })
  );
};   