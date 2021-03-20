//请求域名
import {baseUrl} from './baseUrl.js';
//request (路径,请求方式,文本类型,是否开启loading)
import storage from './storage.js'
let tokenEffective = true;//防止重复弹窗
export function request(options = {data:{}}) {
	//修改角色的接口需要传 roleNames 其他传 roleName
	let params = {};
	if(options.data && options.data.roleName){
		params = Object.assign({roleNames:storage.getRoleName()||''},options.data)
	}else{
		params = Object.assign({roleName:storage.getRoleName()||''},options.data)
	}
	const Authorization = storage.getToken();
	const loginOut = storage.getLoginOut();
	const header = {
		'Content-Type': options.contentType  || 'application/x-www-form-urlencoded',
	};
	//带token, noToken:true 不用检验token
	if(Authorization && !options.noToken){
		//判断登录过期
		
		if(loginOut){
			header['Authorization'] = Authorization;
		}else if(tokenEffective){
			tokenEffective = false;//防止重复弹窗
			//获取当前路径 和 参数
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let redirect = '';
			if(routes.length>0){
				let curRoute = routes[routes.length - 1].route; //获取当前页面路由
				let curParam = routes[routes.length - 1].options; //获取路由参数
				// 拼接参数
				let param = '';
				for (let key in curParam) {
				    if(key != null){
						param += key + '=' + curParam[key] + '&'
					}
				}
				redirect = param ? (curRoute + '?' + param) : curRoute;
			}
			
			storage.cleanUserInfo()
			console.warn('登录过期,请重新登录')
			uni.showModal({
			    title: '提示',
			    content: '登录过期，请重新登录',
				showCancel:false,
			    success: function (res) {
					uni.redirectTo({
						url:`/pages/user/login?redirect=${redirect}`
					})
			    }
			});
			return new Promise((resolve, reject) => {reject()})
		}else{
			storage.cleanUserInfo()
		}
	};
	//删除空key
	for (let property in params) {
		if (params[property] === null || params[property] === '') {
			delete params[property]
		}
	}
	//options.showLoading: true, // 是否显示请求中的loading
	if(options.showLoading){
		uni.showLoading({
			title: '加载中',
			mask:true
		});
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			data:params,
			method:options.method || 'GET',
			timeout:5000,
			header,
			dataType: 'json',
			success: (res) => {
				uni.hideLoading();
				switch (res.data.code) {
					case 200:
						resolve(res.data)
						break;
					case 400:
						uni.showToast({
							icon: 'none',
							title: res.data.data||res.data.msg,
							duration: 1500
						});
						reject(res.data)
						break;
					case 403:
						uni.showToast({
							icon: 'none',
							title: res.data.data,
							duration: 1500
						});
						reject(res.data)
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: res.data.msg || '服务错误',
							duration: 1500
						});
						reject(res.data)
						break;
				}
			},
			fail: (err) => {
				console.log('请求失败')
				options.showLoading && uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: '加载失败',
					duration: 2000
				});
				reject(err)
			}
		})
	})
}
