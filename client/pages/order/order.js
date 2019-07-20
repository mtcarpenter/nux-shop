// pages/order/order.js
import { CartModel } from '../../models/CartModel.js'
import {
  OrderModel
} from '../../models/OrdelModel.js'
import { ProductModel } from '../../models/productModel.js'
let cartmodel = new CartModel()
let productModel = new ProductModel()
let orderModel = new OrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    products: [],
    account: [],
    orderStatus: 0,
    oldOrder: false,
    orderId: '',
    from: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.account = options.account
    //购物车
    if (options.from == 'cart') {
      this.setData({
        products: cartmodel.getCartDataFromLocal(true),
        account: options.account,
        orderStatus: 0,
        from: options.from

      })
    } else if (options.from == 'product') {
      // let 获取商品信息
      productModel.getProductById(options.productId, res => {
        let product = res.result.data.data
        product.counts = parseInt(options.count)
        let newData = []
        newData.push(product);
        this.setData({
          products: newData,
          account: options.count * product.product_sell_price,
          orderStatus: 0
        })
      })
    }
    //旧订单
    else {
      orderModel.getOrderById(options.id, res => {
        let data = res.result.data.data
        let address = {}
        address.userName = data.buyer_name
        address.phone = data.buyer_phone
        address.detailAddress = data.buyer_address
        this.setData({
          orderId: data._id,
          address: address,
          products: data.orderdetail,
          account: data.order_amount,
          orderStatus: data.order_status,
          oldOrder: true
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },//地址信息
  addressInfo: function (e) {
    if ("ok" == e.detail.status) {
      let address = {}
      let addressInfo = e.detail.addressInfo
      address.userName = addressInfo.userName
      address.phone = addressInfo.telNumber
      address.detailAddress = addressInfo.provinceName + addressInfo.cityName + addressInfo.countyName + addressInfo.detailInfo
      this.setData({
        address
      })
    }

  },
  // 提交订单
  confirm: function () {
    // 判断是否选择地址
    if (this.data.address.length == 0) {
      this._showToast('none', '请选择地址')
      return
    }
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '授权提示',
            content: '下单需要在个人中心授权！',
            success(res) {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          })
        } else {
          // 判断是否是旧订单
          if (this.data.oldOrder) {
            this._showToast('none', '订单支付暂未开通！')
            return
          }
          // 地址拼接
          let orderData = {}
          orderData.address = this.data.address
          orderData.products = this.data.products
          orderData.account = this.data.account
          // 创建订单
          orderModel.creat(orderData, res => {
            if (res.result.code == 0) {
              this._showToast('none', '订单创建成功!')
              // 设置成就订单
              this.setData({
                oldOrder: true
              })
              
              if (this.data.from == 'cart') {
                let ids = []
                let products = this.data.products
                for (let i = 0; i < products.length; i++) {
                  ids.push(products[i]._id);
                }
                cartmodel.delete(ids, res => { })
              }

              wx.showModal({
                title: '支付提示',
                content: '支付暂未实现！',
                success(res) {
                  wx.switchTab({
                    url: '/pages/my/my'
                  })
                }
              })
            }
          })


        }
      }
    })


  },
  // 订单详情
  productDetail: function (event) {
    let product_id = orderModel.getDataSet(event, "id")
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + product_id,
    })
  },
  _showToast: function (type, msg) {
    wx.showToast({
      icon: type,
      title: msg
    })
  }
})