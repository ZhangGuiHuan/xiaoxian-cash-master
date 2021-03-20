//菜单路由
export function navigateTo(url) {
    if(!url){
      uni.showToast({
      	title:'URL为空！',
		icon:'none'
      })
    }else{
		//跳转
		uni.navigateTo({
		    url:url,
		    fail() {
				console.error('跳转失败，路径有误:'+url);
		        uni.navigateTo({
		            url:'/pages/404/404',
		        })
		    }
		})
	}
}