const model = require('../models/BaseModel.js')
const { THEME, PRODUCT_THEME} = require('../config/tableConfig.js')
const { THEMEFIELD } = require('../fields/themeField.js')

/**
 * 获取主题列表
 * @return 
 */
const getTheme = () => {
  return model.query( THEME, THEMEFIELD )
}

/**
 * 获取主题对应的商品列表
 * @param theme_type 主题类型
 * @return 
 */
const getProductThemeType = ( theme_type ) => {
  let options = { theme_type: theme_type }
  return model.query(PRODUCT_THEME, PRODUCTTHEMEFIELD,options )
}



module.exports = {
  getTheme,
  getProductThemeType
}