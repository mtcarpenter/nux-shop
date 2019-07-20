// pages/my/my.js
import {
  OrderModel
} from '../../models/OrdelModel.js'
let orderModel = new OrderModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    defaultImg: '../../images/my/header.png',
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
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
    this._init();
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
  // 初始化
  _init: function () {
    wx.getSetting({
      success:(res)=> {
        if (res.authSetting['scope.userInfo']) {
          // 获取订单信息
          orderModel.getOrderList(res => {
            this.setData({
              orders: res.result.data.data
            })
          })

          // 获取用户信息  
          wx.getUserInfo({
            success: (res) =>{
             this.setData({
              userInfo:res.userInfo
             })
            }
          })
        }
      }
    })
  },
  // 订单页面
  pay: function (event) {
    let id = orderModel.getDataSet(event, 'id')
    wx.navigateTo({
      url: '/pages/order/order?id=' + id
    })
  },
  // 用户信息获取
  getuserinfo:function(event){
    this.setData({
      userInfo:event.detail.userInfo
    })
  }

})