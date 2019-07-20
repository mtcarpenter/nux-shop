// pages/cart/cart.js
import { CartModel } from '../../models/CartModel.js'
let cartmodel = new CartModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData: [],
    selectedCounts: 0, //总的商品数
    selectedCheckCounts: 0, //总的商品数  
    account: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this._init()
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

  },
  // 初始化数据
  _init: function () {
    cartmodel.getCartData(res => {
      this.setData({
        cartData: res,
        account: this._totalAccountAndCounts(res).account,
        selectedCheckCounts: this._totalAccountAndCounts(res).selectedCheckCounts
      })

    })
  },
  // 更新商品数量
  changeCounts: function (event) {
    let id = cartmodel.getDataSet(event, 'id')
    let type = cartmodel.getDataSet(event, 'type')
    let index = this._getProductIndexById(id)
    let counts = 1
    if (type == 'add') {
      cartmodel.addCounts(id, res => { })
    } else {
      counts = -1
      cartmodel.cutCounts(id, res => { })
    }
    //更新商品页面
    this.data.cartData[index].counts += counts
    this._resetCartData()
  },
  /*更新购物车商品数据*/
  _resetCartData: function () {
    let newData = this._totalAccountAndCounts(this.data.cartData) /*重新计算总金额和商品总数*/
    this.setData({
      account: newData.account,
      selectedCounts: newData.selectedCounts,
      selectedCheckCounts: newData.selectedCheckCounts,
      cartData: this.data.cartData
    })
  },
  /*离开页面时，更新本地缓存*/
  onHide: function () {
    cartmodel.localSetStorageSync(this.data.cartData)
  },
  /*
  * 计算总金额和选择的商品总数
  * */
  _totalAccountAndCounts: function (data) {
    let len = data.length
    let account = 0
    let selectedCounts = 0
    let selectedCheckCounts = 0
    let multiple = 100
    for (let i = 0; i < len; i++) {
      //避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，乘以 100 *100
      if (data[i].selectStatus) {
        account += data[i].counts * multiple * Number(data[i].product_sell_price) * multiple;
        selectedCounts += data[i].counts
        selectedCheckCounts++
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedCheckCounts: selectedCheckCounts,
      account: account / (multiple * multiple)
    }
  },
  /*根据商品id得到 商品所在下标*/
  _getProductIndexById: function (id) {
    let data = this.data.cartData
    let len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i]._id == id) {
        return i
      }
    }
  },
  /*删除商品*/
  delete: function (event) {
    let id = cartmodel.getDataSet(event, 'id')
    let index = this._getProductIndexById(id)
    this.data.cartData.splice(index, 1)//删除某一项商品
    this._resetCartData()
    cartmodel.delete(id, res => { })  //内存中删除该商品
  },

  /*选择商品*/
  toggleSelect: function (event) {
    let id = cartmodel.getDataSet(event, 'id')
    let status = cartmodel.getDataSet(event, 'status')
    let index = this._getProductIndexById(id)
    this.data.cartData[index].selectStatus = !status
    this._resetCartData()
  },
  /*全选*/
  checkall: function (event) {
    let status = cartmodel.getDataSet(event, 'status') == 'true'
    let data = this.data.cartData
    for (let i = 0; i < data.length; i++) {
      data[i].selectStatus = !status
    }
    this._resetCartData()
  },
  /*提交订单*/
  confirm: function () {
    wx.navigateTo({
      url: '/pages/order/order?account=' + this.data.account + '&from=cart'
    })
  },
  // 订单详情
  productDetail: function (event) {
    let product_id = cartmodel.getDataSet(event, "id")
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + product_id,
    })
  }

})


