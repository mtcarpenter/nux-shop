const model = require('models/BaseModel.js')
// 测试BaseModel

/**
 * 编辑处理
 * @param  {object} document      集合名称
 * @param  {object} type     参数
 * @return {object|null}       操作结果
 */
const test = (type = 1, field = {},doc='test') => {
  let result 
  let id = 'f896855d5cfb5f6901c18d424a19b0bd'
  switch (type) {
    case 1:
      // 1、查询所有
      result = model.query(doc,field)
      break;
    case 2:
      //2、 根据id查询
      result = model.findById(doc,id)
      break;
    case 3:
      //3、新增
      let params_add = {name:'test01',age:12,sex:0,show:true}
      result = model.add(doc, params_add)
      break;  
    case 4:
       //4、修改
      let params_update = {id:id, name:'test02', age:20,sex:1, show: true }
      result = model.update(doc, params_update)
      break; 
    case 5:
     // 5、删除
      result = model.remove(doc,id)
      break; 
  } 

  return result
}

module.exports = {
  test
}