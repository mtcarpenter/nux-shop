// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    openType: {
      type: String
    },
    imageSrc: {
      type: String
    },
    bindgetuserinfo: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    addressInfo:""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event) {   
      if (this.data.openType == "getUserInfo"){             
       // if (event.detail.errMsg) {
        this.triggerEvent('getuserinfo', event.detail, {})
       // }
      }           
    }, 
    address(event){    
      if (this.data.openType == "primary") {
        this.addressInfo(event) 
      }      
    },
    addressInfo(event){      
      wx.chooseAddress({
        success: (res) => {
          this.setData({
            addressInfo: res
          })
        },
        fail:(err) =>{}, 
        complete:(e)=> {
          if (e.errMsg == "chooseAddress:ok") {
            this.triggerEvent('addressInfo', {
              addressInfo: this.data.addressInfo,
              status: "ok"
            }, {})
          } else {
            this.triggerEvent('addressInfo', {
              status: "error"
            }, {})
          }

        }
      })
    }
  }
})
