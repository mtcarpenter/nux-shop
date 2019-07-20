const model = require('../models/BaseModel.js')
const { ORDER } = require('../config/tableConfig.js')
const { ORDERFIELD } = require('../fields/orderField.js')

//orderData,userInfo
const create = (orderData, userInfo) => {
    let orderdetailS = []
    // 添加订单详情
    let create_time = new Date()
    let update_time = new Date()
    for (let product of orderData.products) {
        let params_order_detail = {
            product_id: product._id,
            product_name: product.product_name,
            product_price: product.product_sell_price,
            product_count: product.counts,
            product_img: product.product_img,
            create_time: create_time,
            update_time: update_time
        }
        orderdetailS.push(params_order_detail)

    }
    // 订单信息
    let params_order = {
        buyer_openid: userInfo.openId,
        buyer_name: orderData.address.userName,
        buyer_phone: orderData.address.phone,
        buyer_address: orderData.address.detailAddress,
        order_amount: orderData.account,
        order_status: 0,// 默认未付款
        create_time: new Date(),
        update_time: new Date(),
        orderdetail: orderdetailS
    }

    // 订单生成
    let order = model.add(ORDER, params_order);
    return order
}
/**
 * 根据订单id获取订单信息
 * @param {*} orderId 
 */
const getOrderById = (orderId) => {
    return model.findById(ORDER, ORDERFIELD, orderId)
}

/**
 * 根据用户openid获取信息
 * @param {*} userInfo 
 */
const getOrderList = (userInfo, page = 0, size = 20, order = {}) => {
    order.name = 'create_time'
    order.orderBy = 'desc'
    let options = { buyer_openid: userInfo.openId }
    return model.query(ORDER, ORDERFIELD, options, page, size, order)
}



module.exports = {
    create,
    getOrderById,
    getOrderList
}