module.exports = {
  configureWebpack: { // 和webpack配置合并
    devServer: {
      before(app) {  // mock接口
        app.get('/api/goods', function (req, res) {
          res.json({
            code: 0,
            list: [
              { id: 1, name: "web", price: "1000" },
              { id: 2, name: "php", price: "1500" }
            ]
          })
        })
      }
    }
  }
}