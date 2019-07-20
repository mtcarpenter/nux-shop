// pages/theme/theme.js
import {  ProductModel } from '../../models/productModel.js'
let productModel = new ProductModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init(options.theme_type)
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

  },
  _init:function(theme_type){
    productModel.getThemeProduct(theme_type,res=>{
      this.setData({
        products : res.result.data.data
      })
    })
  },
   // 跳转商品详情
   productDetails:function(e){
    //TODO: 跳转详情
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + e.detail.productId,
    })
  }
  
})