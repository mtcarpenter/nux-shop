// 返回值处理
async function toReturn(ctx){
  return {
    code: 0,
    message: 'success',
    data: ctx.data
  }
}

exports.toReturn = toReturn