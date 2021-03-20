//自动历遍page_modules 的 js 文件
const files = hotRequire.context('.', true, /\.js$/)
  const modules = []
  files.keys().forEach(key => {
  	if (key === './index.js') return
  	const item = files(key)
  	modules.push(...item)
  })
  module.exports = modules
