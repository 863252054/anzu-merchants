const qiniu = require('qiniu') // 需要加载qiniu模块的

const getUploadToken = function () {
  const accessKey = 'P6Hy0f7PHEo0A13_ow3-0_OGvYdFibL8r4eEicIg'
  const secretKey = 'b4_OZ4LFs_wHwGoYVHPbVDZhsKGP_7HmzBqmdbZp'
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: 'yuan619',
    expires: 3600 * 24 * 31
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}
console.log(getUploadToken())

// export { getUploadToken }
