export function getUrl() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
	  console.log(currentPage)
      //var url = currentPage.route //当前页面url
     //return url;
      //var options = currentPage.options //如果要获取url中所带的参数可以查看options   
      //参数多时通过&拼接url的参数
      // var urlWithArgs = url + '?'
      // for (var key in options) {
      //   var value = options[key]
      //   urlWithArgs += key + '=' + value + '&'
      // }
      // urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
      // uni.setStorage({  
      //    key: 'url',
      //    data: `/${urlWithArgs}`
      // })
}