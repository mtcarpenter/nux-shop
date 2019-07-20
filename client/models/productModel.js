
import { CloudRequest } from '../utils/cloud-request.js'
class ProductModel extends CloudRequest {
  
  /**
   * 根据商品ID 获取商品信息
   * @param {*} product_id 
   * @param {*} callBack 
   */
  getProductById(product_id,callBack) {
    this.request({
      url: "getProductById",
      data:{product_id:product_id},
      success: res => {
        callBack(res)
      }
    })
  }

  /**
   * 根据主题类型获取商品信息
   * @param {*} theme_type 
   * @param {*} callBack 
   */
  getThemeProduct(theme_type,callBack){
    theme_type = parseInt(theme_type) 
    this.request({
      url:"getThemeProduct",
      data:{theme_type:theme_type},
      success:res=>{
        callBack(res)
      }
    })
  }

  

}
export { ProductModel }
