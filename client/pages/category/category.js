// pages/category/category.js
import { CategoryModel } from '../../models/CategoryModel.js'
let category = new CategoryModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCategories: [
                    { category_name:'坚果炒货',category_type:1},
                    { category_name: '休闲零食', category_type: 2 },
                    { category_name: '饼干蛋糕', category_type: 3 },
                    { category_name: '蜜饯果干', category_type: 4 },
                    { category_name: '肉干肉脯', category_type: 5 },
                    ],
    menuSelect:1,
    menuNmae:'',
    products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
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
  _init:function(){
    category.getCateGory(res=>{
      let menuCategories = res.result.data.data
      let menuSelect =  menuCategories[0].category_type
      let menuNmae = menuCategories[0].category_name
      this.setData({
        menuCategories,
        menuSelect,
        menuNmae       
      })
      this._getCateGory(menuSelect)
    })
   
  },
  // 菜单切换
  menu: function (event){
    let index = category.getDataSet(event, "index")
    let menuCategories = this.data.menuCategories
    let menuSelect = menuCategories[index].category_type
    let menuNmae = menuCategories[index].category_name
    this._getCateGory(menuSelect)
    this.setData({
      menuSelect,
      menuNmae
    })
  },
  // 跳转商品详情
  productDetails:function(e){
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + e.detail.productId,
    })
    
  },
  _getCateGory:function(type){
    category.getCateGoryProduct(type, data => {
      this.setData({
        products: data.result.data.data
      })
    })
  }
})