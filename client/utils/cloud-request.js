import { config } from "../config.js"
class CloudRequest{

  constructor(){
    this.cloud_route = config.cloud_route
  }

  request(params){
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: this.cloud_route,
      // 传递给云函数的参数
      data: {
        // 要调用的路由的路径，传入准确路径或者通配符*
        $url: params.url, 
        data: params.data 
      },
      success: res => {
        params.success(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
  


}
export { CloudRequest }