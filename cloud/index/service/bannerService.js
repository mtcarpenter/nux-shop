const model = require('../models/BaseModel.js')
const { BANNER } = require('../config/tableConfig.js')
const { BANNERFIELD } = require('../fields/bannerField.js')
/**
 * 获取首页轮播
 * @return 
 */
const getBanner = ()=>{
  let options = {show : true}
  return model.query(BANNER, BANNERFIELD, options )
}

module.exports = {
  getBanner
}