// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.callFunction({
    name: 'index',
    data: {
      $url: 'callFunc',
      name:"云函数之间测试"
    }
  }).then(res=>{
    console.log(res)
  }).catch(error=>{
    console.log(error)
  })

  return res
}