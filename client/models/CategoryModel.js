import { CloudRequest } from '../utils/cloud-request.js'
class CategoryModel extends CloudRequest {
    /**
     * 获取分类
     * @param {*} callBack 
     */
    getCateGory(callBack){
        this.request({
            url: "getCategoryMenu",
            success: res => {
              callBack(res)
            }
        })
    }
    
    /**
     * 根据商品类型获取商品
     * @param {*} category_type 
     * @param {*} callBack 
     */
    getCateGoryProduct(category_type,callBack){
        this.request({
            url: "getCategoryProduct",
            data:category_type,
            success: res => {
              callBack(res)
            }
        })
    }

}
export { CategoryModel }