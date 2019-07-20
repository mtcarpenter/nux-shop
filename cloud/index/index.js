// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

const returnUtil = require('utils/ReturnUtil.js')
const banner = require('service/bannerService.js')
const theme = require('service/themeService.js')
const product = require('service/productService.js')
const order = require('service/orderService.js')
const baseTest = require('test/models/BaseModelTest.js')
cloud.init()
const IMAGEPREFIX = "cloud://release-prod.7265-release-prod"


// 云函数入口函数
exports.main = async (event, context) => {
  const { ENV } = cloud.getWXContext()
  // 更新默认配置，将默认访问环境设为当前云函数所在环境
  cloud.updateConfig({
    env: ENV
  })

  const app = new TcbRouter({ event });
  // app.use 表示该中间件会适用于所有的路由
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next(); // 执行下一中间件
  });

  /***************************    首页   *****************************************/
  // 获取轮播
  app.router('getBanner', async (ctx, next) => {
    ctx.data = await _bannerItem(banner.getBanner())
    ctx.body = await returnUtil.success(ctx)
    await next();
  })
  // 获取主题
  app.router('getTheme', async (ctx, next) => {
    ctx.data = await _themeItem(theme.getTheme())
    ctx.body = await returnUtil.success(ctx)
    await next()
  })
  // 获取最新前5商品
  app.router('getProductNew', async (ctx, next) => {
    ctx.data = await _productItem(product.getProduct({}, 0, 4))
    ctx.body = await returnUtil.success(ctx)
    await next()
  })

  /***************************    分类   *****************************************/
  // 获取分类
  app.router('getCategoryMenu', async (ctx, next) => {
    ctx.data = await product.getCategoryMenu()
    ctx.body = await returnUtil.success(ctx)
    await next()
  })
  // 获取分类商品
  app.router('getCategoryProduct', async (ctx, next) => {
    let options = {}
    // ctx.data 前台传过来的category_type
    options.category_type = event.data
    ctx.data = await _productItem(product.getCategoryProduct(options))
    ctx.body = await returnUtil.success(ctx)
    await next()
  })

  /***************************    商品信息   *****************************************/

  // 获取商品信息
  app.router('getProductById', async (ctx, next) => {
    let product_id = event.data.product_id
    ctx.data = await _productImg(product.getProductById(product_id))
    ctx.body = await returnUtil.success(ctx)
    await next()
  })


  /***************************    主题商品   *****************************************/
  // 获取主题商品列表
  app.router('getThemeProduct', async (ctx, next) => {
    let theme_type = event.data.theme_type
    ctx.data = await _productItem(product.getThemeProduct(theme_type))
    ctx.body = await returnUtil.success(ctx)
    await next()
  })

  /***************************    订单   *****************************************/
  // 生成订单
  app.router('creatOrder', async (ctx, next) => {
    //event.data.orderData,event.userInfo
    ctx.data = await order.create(event.data.orderData, event.userInfo)
    ctx.body = await returnUtil.success(ctx)
    await next()
  })

  // 根据订单获取信息
  app.router('getOrderById', async (ctx, next) => {
    let orderId = event.data.orderId
    ctx.data = await order.getOrderById(orderId)
    ctx.body = await returnUtil.success(ctx)
    await next()
  })

  // 获取订单信息
  app.router('getOrderList', async (ctx, next) => {
    ctx.data = await order.getOrderList(event.userInfo)
    ctx.body = await returnUtil.success(ctx)
    await next()
  })


  /***************************    测试   *****************************************/

  app.router('tests', async (ctx, next) => {
    // test 可参数类型 是否决定传参
    ctx.data = await baseTest.test()
    ctx.body = await returnUtil.success(ctx);
    await next();
  })

  /***************************    云函数调用   *************************************/

  app.router('callFunc', async (ctx, next) => {
    // test 可参数类型 是否决定传参
    console.log(event.data)
    ctx.data = "云函数之间的调用"
    ctx.body = await returnUtil.success(ctx);
    await next();
  })




  // 轮播图片地址拼接
  function _bannerItem(data) {
    return new Promise((resolve, reject) => {
      data.then(res => {
        res.data.forEach(data => {
          data.image = IMAGEPREFIX + data.image
        })
        resolve(res)
      })
    })
  }
  // 主题图片地址拼接
  function _themeItem(data) {
    return new Promise((resolve, reject) => {
      data.then(res => {
        res.data.forEach(data => {
          data.theme_icon = IMAGEPREFIX + data.theme_icon
        })
        resolve(res)
      })
    })
  }
  // 多个商品图片地址拼接
  function _productItem(data) {
    return new Promise((resolve, reject) => {
      data.then(res => {
        res.data.forEach(data => {
          data.product_img = IMAGEPREFIX + data.product_img
        })
        resolve(res)
      })
    })
  }
  // 单个商品图片地址拼接
  function _productImg(data) {
    return new Promise((resolve, reject) => {
      data.then(res => {
        res.data.product_img = IMAGEPREFIX + res.data.product_img
        resolve(res)
      })
    })
  }


  return app.serve();
}